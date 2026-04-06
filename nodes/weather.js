/**
 * LeafEngines Weather Node for Node-RED
 * Provides live weather and soil fusion data
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesWeatherNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.endpoint = 'live-agricultural-data';
        this.countyFips = config.countyFips;
        this.dataTypes = config.dataTypes || ['weather', 'soil_moisture'];
        this.forecastDays = config.forecastDays || 3;
        
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
                // Use configured FIPS or message property
                const countyFips = node.countyFips || msg.payload?.county_fips || msg.county_fips;
                
                if (!countyFips || !/^\d{5}$/.test(countyFips)) {
                    node.error('Valid 5-digit county FIPS code required');
                    if (done) done('Valid 5-digit county FIPS code required');
                    return;
                }
                
                const baseUrl = node.config.getBaseUrl();
                const url = `${baseUrl}/${node.endpoint}`;
                
                node.status({ fill: 'blue', shape: 'dot', text: 'Fetching weather data...' });
                
                const response = await axios.post(url, {
                    county_fips: countyFips,
                    data_types: node.dataTypes,
                    forecast_days: node.forecastDays
                }, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                node.status({ fill: 'green', shape: 'dot', text: 'Weather data received' });
                
                // Process response
                const data = response.data;
                
                // Format for different use cases
                let output;
                if (node.dataTypes.length === 1 && node.dataTypes[0] === 'weather') {
                    // Weather-only format
                    output = {
                        county_fips: countyFips,
                        current: data.current_weather,
                        forecast: data.weather_forecast,
                        alerts: data.weather_alerts,
                        last_updated: data.last_updated
                    };
                } else if (node.dataTypes.length === 1 && node.dataTypes[0] === 'soil_moisture') {
                    // Soil moisture-only format
                    output = {
                        county_fips: countyFips,
                        soil_moisture: data.soil_moisture,
                        depth_profile: data.soil_depth_profile,
                        trend: data.moisture_trend,
                        last_updated: data.last_updated
                    };
                } else {
                    // Combined format
                    output = data;
                }
                
                // Add agricultural insights if available
                if (data.agricultural_insights) {
                    output.insights = data.agricultural_insights;
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `weather/${countyFips}`;
                msg.leafengines = {
                    endpoint: node.endpoint,
                    county_fips: countyFips,
                    data_types: node.dataTypes,
                    forecast_days: node.forecastDays,
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
                
                let errorMessage = 'Failed to get weather data';
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
    
    RED.nodes.registerType("leafengines-weather", LeafEnginesWeatherNode);
};