/**
 * LeafEngines Water Quality Node for Node-RED
 * Provides EPA water quality monitoring and analytics
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesWaterNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.endpoint = config.endpoint || 'territorial-water-quality';
        this.countyFips = config.countyFips;
        this.includeAnalytics = config.includeAnalytics !== false;
        this.timeRange = config.timeRange || '30d';
        
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
                const countyFips = node.countyFips || msg.payload?.county_fips || msg.county_fips || msg.payload?.fips;
                
                if (!countyFips || !/^\d{5}$/.test(countyFips)) {
                    node.error('Valid 5-digit county FIPS code required');
                    if (done) done('Valid 5-digit county FIPS code required');
                    return;
                }
                
                const baseUrl = node.config.getBaseUrl();
                let url, payload;
                
                if (node.endpoint === 'territorial-water-analytics' && node.includeAnalytics) {
                    url = `${baseUrl}/territorial-water-analytics`;
                    payload = {
                        fips: countyFips,
                        time_range: node.timeRange,
                        include_trends: true,
                        include_comparison: true
                    };
                } else {
                    url = `${baseUrl}/territorial-water-quality`;
                    payload = { fips: countyFips };
                }
                
                node.status({ fill: 'blue', shape: 'dot', text: 'Fetching water data...' });
                
                const response = await axios.post(url, payload, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                node.status({ fill: 'green', shape: 'dot', text: 'Water data received' });
                
                // Process response
                const data = response.data;
                
                // Format output
                let output = {
                    county_fips: countyFips,
                    water_quality_index: data.water_quality_index,
                    safety_status: data.safety_status,
                    last_sample_date: data.last_sample_date,
                    monitoring_stations: data.monitoring_stations
                };
                
                // Add contaminants if available
                if (data.contaminants) {
                    output.contaminants = data.contaminants;
                    
                    // Calculate summary
                    const criticalContaminants = data.contaminants.filter(c => 
                        c.level > (c.limit * 0.8) // 80% of limit or higher
                    );
                    
                    if (criticalContaminants.length > 0) {
                        output.alerts = {
                            critical_contaminants: criticalContaminants.length,
                            contaminants: criticalContaminants.map(c => c.name)
                        };
                    }
                }
                
                // Add analytics if available
                if (data.trends) {
                    output.trends = data.trends;
                }
                
                if (data.comparison) {
                    output.comparison = data.comparison;
                }
                
                // Add agricultural implications
                if (data.agricultural_implications) {
                    output.agricultural_implications = data.agricultural_implications;
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `water/${countyFips}`;
                msg.leafengines = {
                    endpoint: node.endpoint,
                    county_fips: countyFips,
                    include_analytics: node.includeAnalytics,
                    time_range: node.timeRange,
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
                
                let errorMessage = 'Failed to get water quality data';
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
    
    RED.nodes.registerType("leafengines-water", LeafEnginesWaterNode);
};