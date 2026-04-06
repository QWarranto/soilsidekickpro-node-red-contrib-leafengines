/**
 * LeafEngines Generic Query Node for Node-RED
 * Can call any LeafEngines endpoint dynamically
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesQueryNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.endpoint = config.endpoint || 'get-soil-data';
        this.method = config.method || 'POST';
        this.autoParse = config.autoParse !== false;
        
        if (!this.config) {
            this.error('LeafEngines configuration not found');
            return;
        }
        
        if (!this.config.isValidKey()) {
            this.error('Invalid LeafEngines API key format');
            return;
        }
        
        const node = this;
        
        node.on('input', async function(msg, send, done) {
            try {
                // Determine endpoint from config or message
                let endpoint = node.endpoint;
                if (msg.endpoint && msg.endpoint !== node.endpoint) {
                    endpoint = msg.endpoint;
                }
                
                // Get parameters from config or message
                let params = {};
                if (config.parameters) {
                    try {
                        params = JSON.parse(config.parameters);
                    } catch (e) {
                        node.warn(`Failed to parse parameters from config: ${e.message}`);
                    }
                }
                
                // Merge with message payload
                if (msg.payload && typeof msg.payload === 'object') {
                    params = { ...params, ...msg.payload };
                }
                
                const baseUrl = node.config.getBaseUrl();
                const url = `${baseUrl}/${endpoint}`;
                
                node.status({ fill: 'blue', shape: 'dot', text: `Calling ${endpoint}...` });
                
                let response;
                if (node.method.toUpperCase() === 'GET') {
                    response = await axios.get(url, {
                        headers: {
                            'x-api-key': node.config.apiKey
                        },
                        params: params,
                        timeout: 30000
                    });
                } else {
                    response = await axios.post(url, params, {
                        headers: {
                            'x-api-key': node.config.apiKey,
                            'Content-Type': 'application/json'
                        },
                        timeout: 30000
                    });
                }
                
                node.status({ fill: 'green', shape: 'dot', text: `${endpoint} complete` });
                
                // Process response
                let output = response.data;
                
                // Apply auto-parsing if enabled
                if (node.autoParse && output) {
                    // Extract cache information
                    if (output.cache_info) {
                        msg.cache = {
                            level: output.cache_info.level,
                            age_seconds: output.cache_info.age_seconds,
                            stale: output.cache_info.stale
                        };
                        delete output.cache_info;
                    }
                    
                    // Extract confidence intervals
                    if (output.confidence_intervals) {
                        msg.confidence = output.confidence_intervals;
                        delete output.confidence_intervals;
                    }
                    
                    // Extract metadata
                    if (output.metadata) {
                        msg.metadata = output.metadata;
                        delete output.metadata;
                    }
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `leafengines/${endpoint}`;
                msg.leafengines = {
                    endpoint: endpoint,
                    method: node.method,
                    timestamp: new Date().toISOString(),
                    cache_hit: response.headers?.['x-cache-hit'] === 'true',
                    response_time: response.headers?.['x-response-time'] || 'unknown',
                    rate_limit_remaining: response.headers?.['x-ratelimit-remaining'],
                    rate_limit_reset: response.headers?.['x-ratelimit-reset']
                };
                
                send(msg);
                if (done) done();
                
                // Clear status after 3 seconds
                setTimeout(() => {
                    node.status({});
                }, 3000);
                
            } catch (error) {
                node.status({ fill: 'red', shape: 'ring', text: 'Error' });
                
                let errorMessage = `Failed to call ${node.endpoint}`;
                let errorDetails = {};
                
                if (error.response) {
                    errorMessage = `API Error (${error.response.status}): ${error.response.data?.error || error.response.statusText}`;
                    errorDetails = {
                        status: error.response.status,
                        data: error.response.data,
                        headers: error.response.headers
                    };
                    node.warn(`LeafEngines API error for ${node.endpoint}: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                } else if (error.request) {
                    errorMessage = 'Network error: No response received';
                    errorDetails = { request: error.request };
                    node.warn(`LeafEngines network error for ${node.endpoint}: No response received`);
                } else {
                    errorMessage = `Error: ${error.message}`;
                    errorDetails = { message: error.message };
                    node.warn(`LeafEngines error for ${node.endpoint}: ${error.message}`);
                }
                
                // Add error details to message
                msg.error = {
                    message: errorMessage,
                    details: errorDetails,
                    endpoint: node.endpoint,
                    timestamp: new Date().toISOString()
                };
                
                node.error(errorMessage, msg);
                if (done) done(errorMessage);
                
                // Clear error status after 5 seconds
                setTimeout(() => {
                    node.status({});
                }, 5000);
            }
        });
        
        node.on('close', function() {
            node.status({});
        });
    }
    
    RED.nodes.registerType("leafengines-query", LeafEnginesQueryNode);
    
    // Add endpoint discovery endpoint
    RED.httpAdmin.get('/leafengines/discover', async function(req, res) {
        try {
            // This would normally fetch from the LeafEngines API
            // For now, return static list based on white paper
            const endpoints = [
                {
                    name: 'get-soil-data',
                    description: 'USDA soil composition by county FIPS',
                    category: 'soil',
                    tier: 'free',
                    method: 'POST',
                    parameters: {
                        county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true }
                    }
                },
                {
                    name: 'county-lookup',
                    description: 'Geographic resolution (name/state → FIPS code)',
                    category: 'geography',
                    tier: 'free',
                    method: 'POST',
                    parameters: {
                        term: { type: 'string', required: true },
                        state: { type: 'string', required: false }
                    }
                },
                {
                    name: 'territorial-water-quality',
                    description: 'EPA water quality monitoring',
                    category: 'water',
                    tier: 'starter',
                    method: 'POST',
                    parameters: {
                        fips: { type: 'string', pattern: '^[0-9]{5}$', required: true }
                    }
                },
                {
                    name: 'multi-parameter-planting-calendar',
                    description: 'Multi-parameter planting optimization',
                    category: 'crop',
                    tier: 'starter',
                    method: 'POST',
                    parameters: {
                        county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true },
                        crop_type: { type: 'string', required: false },
                        planting_date: { type: 'string', format: 'date', required: false }
                    }
                },
                {
                    name: 'agricultural-intelligence',
                    description: 'AI crop recommendations',
                    category: 'ai',
                    tier: 'pro',
                    method: 'POST',
                    parameters: {
                        county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true },
                        crop_type: { type: 'string', required: true },
                        query: { type: 'string', required: true }
                    }
                },
                {
                    name: 'carbon-credit-calculator',
                    description: 'Carbon credit estimation',
                    category: 'carbon',
                    tier: 'pro',
                    method: 'POST',
                    parameters: {
                        county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true },
                        acreage: { type: 'number', required: true },
                        crop_type: { type: 'string', required: false },
                        practice_changes: { type: 'array', items: { type: 'string' }, required: false }
                    }
                },
                {
                    name: 'generate-vrt-prescription',
                    description: 'Variable-rate prescription generation',
                    category: 'prescription',
                    tier: 'pro',
                    method: 'POST',
                    parameters: {
                        county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true },
                        field_boundary: { type: 'object', required: true },
                        crop_type: { type: 'string', required: true },
                        input_type: { type: 'string', enum: ['fertilizer', 'pesticide', 'water'], required: true }
                    }
                },
                {
                    name: 'leafengines-query',
                    description: 'Natural language query interface',
                    category: 'ai',
                    tier: 'pro',
                    method: 'POST',
                    parameters: {
                        query: { type: 'string', required: true },
                        context: { type: 'object', required: false }
                    }
                },
                {
                    name: 'gpt5-chat',
                    description: 'Advanced conversational AI',
                    category: 'ai',
                    tier: 'enterprise',
                    method: 'POST',
                    parameters: {
                        message: { type: 'string', required: true },
                        conversation_history: { type: 'array', required: false }
                    }
                }
            ];
            
            res.json(endpoints);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};