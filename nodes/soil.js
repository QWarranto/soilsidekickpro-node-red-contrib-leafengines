/**
 * LeafEngines Soil Analysis Node for Node-RED
 * Provides USDA soil composition data by county FIPS
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesSoilNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.endpoint = 'get-soil-data';
        this.countyFips = config.countyFips;
        this.outputFormat = config.outputFormat || 'full';
        
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
                
                node.status({ fill: 'blue', shape: 'dot', text: 'Requesting soil data...' });
                
                const response = await axios.post(url, {
                    county_fips: countyFips
                }, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                node.status({ fill: 'green', shape: 'dot', text: 'Soil data received' });
                
                // Format output based on configuration
                let output;
                switch (node.outputFormat) {
                    case 'summary':
                        output = {
                            county_fips: countyFips,
                            soil_texture: response.data?.soil_texture,
                            organic_matter: response.data?.organic_matter,
                            ph_level: response.data?.ph_level,
                            drainage_class: response.data?.drainage_class,
                            nitrogen: response.data?.nitrogen,
                            phosphorus: response.data?.phosphorus,
                            potassium: response.data?.potassium,
                            cache_info: response.data?.cache_info
                        };
                        break;
                    case 'minimal':
                        output = {
                            county_fips: countyFips,
                            soil_texture: response.data?.soil_texture,
                            organic_matter: response.data?.organic_matter,
                            ph_level: response.data?.ph_level
                        };
                        break;
                    default: // 'full'
                        output = response.data;
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `soil/${countyFips}`;
                msg.leafengines = {
                    endpoint: node.endpoint,
                    county_fips: countyFips,
                    timestamp: new Date().toISOString(),
                    cache_hit: response.data?.cache_info?.level !== 'origin',
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
                
                let errorMessage = 'Failed to get soil data';
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
    
    RED.nodes.registerType("leafengines-soil", LeafEnginesSoilNode);
    
    // Add HTML for node configuration
    RED.httpAdmin.get('/leafengines-soil-html', function(req, res) {
        res.send(`
            <script type="text/javascript">
                RED.nodes.registerType('leafengines-soil', {
                    category: 'leafengines',
                    color: '#4CAF50',
                    defaults: {
                        name: { value: '' },
                        config: { type: 'leafengines-config', required: true },
                        countyFips: { value: '', required: true },
                        outputFormat: { value: 'full' }
                    },
                    inputs: 1,
                    outputs: 1,
                    icon: 'leaf.png',
                    label: function() {
                        return this.name || 'LeafEngines Soil';
                    },
                    labelStyle: function() {
                        return this.name ? 'node_label_italic' : '';
                    },
                    oneditprepare: function() {
                        $('#node-input-countyFips').attr('placeholder', 'e.g., 48453');
                        $('#node-input-outputFormat').change(function() {
                            const format = $(this).val();
                            $('#node-help-outputFormat').text(
                                format === 'full' ? 'Returns complete soil analysis data' :
                                format === 'summary' ? 'Returns key soil parameters only' :
                                'Returns minimal soil information'
                            );
                        });
                    },
                    oneditsave: function() {
                        const fips = $('#node-input-countyFips').val();
                        if (fips && !/^\d{5}$/.test(fips)) {
                            alert('County FIPS must be a 5-digit number');
                            return false;
                        }
                        return true;
                    }
                });
            </script>
            
            <div class="form-row">
                <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
                <input type="text" id="node-input-name" placeholder="Soil Analysis">
            </div>
            
            <div class="form-row">
                <label for="node-input-config"><i class="fa fa-key"></i> Configuration</label>
                <input type="text" id="node-input-config">
            </div>
            
            <div class="form-row">
                <label for="node-input-countyFips"><i class="fa fa-map-marker"></i> County FIPS</label>
                <input type="text" id="node-input-countyFips" style="width: 70%;">
                <span style="margin-left: 10px; color: #666;">5-digit code</span>
            </div>
            
            <div class="form-row">
                <label for="node-input-outputFormat"><i class="fa fa-file-text-o"></i> Output Format</label>
                <select id="node-input-outputFormat" style="width: 70%;">
                    <option value="full">Full Analysis</option>
                    <option value="summary">Summary Only</option>
                    <option value="minimal">Minimal Data</option>
                </select>
                <div id="node-help-outputFormat" style="margin-top: 5px; color: #666; font-size: 0.9em;">
                    Returns complete soil analysis data
                </div>
            </div>
            
            <div class="form-row">
                <label for="node-info"><i class="fa fa-info-circle"></i> Information</label>
                <div style="padding: 10px; background: #f5f5f5; border-radius: 4px; margin-top: 5px;">
                    <p><strong>Endpoint:</strong> get-soil-data</p>
                    <p><strong>Tier:</strong> Free</p>
                    <p><strong>Description:</strong> USDA soil composition by county FIPS</p>
                    <p><strong>Rate Limit:</strong> 10 requests/minute (Free tier)</p>
                </div>
            </div>
        `);
    });
};