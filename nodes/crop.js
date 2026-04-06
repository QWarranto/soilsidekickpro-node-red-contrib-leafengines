/**
 * LeafEngines Crop Intelligence Node for Node-RED
 * Provides AI crop recommendations, planting calendars, and identification
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesCropNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.mode = config.mode || 'planting_calendar'; // planting_calendar, recommendations, identification
        this.countyFips = config.countyFips;
        this.cropType = config.cropType || '';
        this.plantingDate = config.plantingDate || '';
        this.includeGuidance = config.includeGuidance !== false;
        
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
                const cropType = node.cropType || msg.payload?.crop_type || msg.crop_type;
                const plantingDate = node.plantingDate || msg.payload?.planting_date || msg.planting_date;
                const mode = node.mode || msg.payload?.mode || msg.mode;
                
                if (!countyFips || !/^\d{5}$/.test(countyFips)) {
                    node.error('Valid 5-digit county FIPS code required');
                    if (done) done('Valid 5-digit county FIPS code required');
                    return;
                }
                
                const baseUrl = node.config.getBaseUrl();
                let url, payload, endpoint;
                
                // Determine endpoint based on mode
                switch (mode) {
                    case 'planting_calendar':
                        endpoint = 'multi-parameter-planting-calendar';
                        url = `${baseUrl}/${endpoint}`;
                        payload = {
                            county_fips: countyFips,
                            crop_type: cropType,
                            planting_date: plantingDate,
                            include_guidance: node.includeGuidance
                        };
                        break;
                        
                    case 'recommendations':
                        endpoint = 'agricultural-intelligence';
                        url = `${baseUrl}/${endpoint}`;
                        payload = {
                            county_fips: countyFips,
                            crop_type: cropType,
                            query: msg.payload?.query || 'Provide crop recommendations'
                        };
                        break;
                        
                    case 'identification':
                        endpoint = 'safe-identification';
                        url = `${baseUrl}/${endpoint}`;
                        payload = {
                            county_fips: countyFips,
                            plant_description: msg.payload?.plant_description || msg.payload?.description,
                            include_toxic_lookalikes: true
                        };
                        break;
                        
                    case 'guidance':
                        endpoint = 'beginner-guidance';
                        url = `${baseUrl}/${endpoint}`;
                        payload = {
                            county_fips: countyFips,
                            crop_type: cropType,
                            experience_level: msg.payload?.experience_level || 'beginner'
                        };
                        break;
                        
                    default:
                        node.error(`Unknown mode: ${mode}`);
                        if (done) done(`Unknown mode: ${mode}`);
                        return;
                }
                
                node.status({ fill: 'blue', shape: 'dot', text: `Getting ${mode.replace('_', ' ')}...` });
                
                const response = await axios.post(url, payload, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                node.status({ fill: 'green', shape: 'dot', text: `${mode.replace('_', ' ')} received` });
                
                // Process response
                const data = response.data;
                
                // Format output based on mode
                let output = {
                    county_fips: countyFips,
                    mode: mode,
                    timestamp: new Date().toISOString()
                };
                
                switch (mode) {
                    case 'planting_calendar':
                        output.crop_type = cropType;
                        output.planting_date = plantingDate;
                        output.optimal_planting_window = data.optimal_planting_window;
                        output.risk_factors = data.risk_factors;
                        output.recommendations = data.recommendations;
                        
                        if (data.guidance && node.includeGuidance) {
                            output.guidance = data.guidance;
                        }
                        break;
                        
                    case 'recommendations':
                        output.crop_type = cropType;
                        output.recommendations = data.recommendations;
                        output.confidence_score = data.confidence_score;
                        output.alternatives = data.alternatives;
                        output.risk_assessment = data.risk_assessment;
                        break;
                        
                    case 'identification':
                        output.identified_plant = data.identified_plant;
                        output.confidence = data.confidence;
                        output.toxic_lookalikes = data.toxic_lookalikes;
                        output.safety_warnings = data.safety_warnings;
                        output.care_instructions = data.care_instructions;
                        break;
                        
                    case 'guidance':
                        output.crop_type = cropType;
                        output.guidance_steps = data.guidance_steps;
                        output.common_mistakes = data.common_mistakes;
                        output.resources = data.resources;
                        output.timeline = data.timeline;
                        break;
                }
                
                // Add AI insights if available
                if (data.ai_insights) {
                    output.ai_insights = data.ai_insights;
                }
                
                // Add confidence intervals
                if (data.confidence_intervals) {
                    output.confidence_intervals = data.confidence_intervals;
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `crop/${mode}/${countyFips}`;
                msg.leafengines = {
                    endpoint: endpoint,
                    mode: mode,
                    county_fips: countyFips,
                    crop_type: cropType,
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
                
                let errorMessage = `Failed to get ${node.mode.replace('_', ' ')} data`;
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
    
    RED.nodes.registerType("leafengines-crop", LeafEnginesCropNode);
};