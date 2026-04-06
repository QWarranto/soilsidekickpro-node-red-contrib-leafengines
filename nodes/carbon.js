/**
 * LeafEngines Carbon Credit Node for Node-RED
 * Provides carbon credit estimation and calculation
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesCarbonNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.endpoint = 'carbon-credit-calculator';
        this.countyFips = config.countyFips;
        this.acreage = config.acreage || 100;
        this.cropType = config.cropType || 'corn';
        this.practiceChanges = config.practiceChanges || [];
        this.includeBreakdown = config.includeBreakdown !== false;
        
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
                // Use configured values or message properties
                const countyFips = node.countyFips || msg.payload?.county_fips || msg.county_fips;
                const acreage = node.acreage || msg.payload?.acreage || msg.acreage;
                const cropType = node.cropType || msg.payload?.crop_type || msg.crop_type;
                let practiceChanges = node.practiceChanges;
                
                // Parse practice changes if provided as string
                if (typeof practiceChanges === 'string') {
                    try {
                        practiceChanges = JSON.parse(practiceChanges);
                    } catch (e) {
                        practiceChanges = practiceChanges.split(',').map(p => p.trim());
                    }
                }
                
                // Override with message properties if provided
                if (msg.payload?.practice_changes) {
                    practiceChanges = msg.payload.practice_changes;
                } else if (msg.practice_changes) {
                    practiceChanges = msg.practice_changes;
                }
                
                if (!countyFips || !/^\d{5}$/.test(countyFips)) {
                    node.error('Valid 5-digit county FIPS code required');
                    if (done) done('Valid 5-digit county FIPS code required');
                    return;
                }
                
                if (!acreage || acreage <= 0) {
                    node.error('Valid acreage required (greater than 0)');
                    if (done) done('Valid acreage required (greater than 0)');
                    return;
                }
                
                const baseUrl = node.config.getBaseUrl();
                const url = `${baseUrl}/${node.endpoint}`;
                
                node.status({ fill: 'blue', shape: 'dot', text: 'Calculating carbon credits...' });
                
                const response = await axios.post(url, {
                    county_fips: countyFips,
                    acreage: parseFloat(acreage),
                    crop_type: cropType,
                    practice_changes: practiceChanges,
                    include_breakdown: node.includeBreakdown
                }, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                node.status({ fill: 'green', shape: 'dot', text: 'Carbon calculation complete' });
                
                // Process response
                const data = response.data;
                
                // Format output
                let output = {
                    county_fips: countyFips,
                    acreage: acreage,
                    crop_type: cropType,
                    total_credits: data.total_credits,
                    credit_value: data.credit_value,
                    total_value: data.total_value,
                    certification_eligible: data.certification_eligible,
                    verification_level: data.verification_level
                };
                
                // Add practice changes if provided
                if (practiceChanges && practiceChanges.length > 0) {
                    output.practice_changes = practiceChanges;
                }
                
                // Add breakdown if available and requested
                if (node.includeBreakdown && data.breakdown) {
                    output.breakdown = data.breakdown;
                }
                
                // Add confidence intervals
                if (data.confidence_intervals) {
                    output.confidence = data.confidence_intervals;
                }
                
                // Add recommendations if available
                if (data.recommendations) {
                    output.recommendations = data.recommendations;
                }
                
                // Add regulatory compliance info
                if (data.regulatory_compliance) {
                    output.regulatory_compliance = data.regulatory_compliance;
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `carbon/${countyFips}`;
                msg.leafengines = {
                    endpoint: node.endpoint,
                    county_fips: countyFips,
                    acreage: acreage,
                    crop_type: cropType,
                    practice_changes_count: practiceChanges?.length || 0,
                    timestamp: new Date().toISOString(),
                    cache_hit: data.cache_info?.level !== 'origin',
                    response_time: response.headers?.['x-response-time'] || 'unknown'
                };
                
                send(msg);
                if (done) done();
                
                // Clear status after 3 seconds
                setTimeout(() => {
                    node.status({});
                }, 3000);
                
            } catch (error) {
                node.status({ fill: 'red', shape: 'ring', text: 'Error' });
                
                let errorMessage = 'Failed to calculate carbon credits';
                if (error.response) {
                    errorMessage = `API Error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`;
                    node.warn(`LeafEngines API error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
                } else if (error.request) {
                    errorMessage = 'Network error: No response received';
                    node.warn('LeafEngines network error: No response received');
                } else {
                    errorMessage = `Error: ${error.message}`;
                    node.warn(`LeafEngines error: ${error.message}`);
                }
                
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
    
    RED.nodes.registerType("leafengines-carbon", LeafEnginesCarbonNode);
};