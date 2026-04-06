/**
 * LeafEngines Prescription Node for Node-RED
 * Provides variable-rate prescription generation
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesPrescriptionNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.endpoint = 'generate-vrt-prescription';
        this.countyFips = config.countyFips;
        this.cropType = config.cropType || 'corn';
        this.inputType = config.inputType || 'fertilizer'; // fertilizer, pesticide, water
        this.fieldBoundary = config.fieldBoundary || '';
        this.outputFormat = config.outputFormat || 'geojson'; // geojson, shapefile, json, csv
        
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
                const inputType = node.inputType || msg.payload?.input_type || msg.input_type;
                let fieldBoundary = node.fieldBoundary;
                const outputFormat = node.outputFormat || msg.payload?.output_format || msg.output_format;
                
                // Parse field boundary if provided as string
                if (typeof fieldBoundary === 'string' && fieldBoundary.trim()) {
                    try {
                        fieldBoundary = JSON.parse(fieldBoundary);
                    } catch (e) {
                        node.warn(`Failed to parse field boundary from config: ${e.message}`);
                        fieldBoundary = null;
                    }
                }
                
                // Override with message properties if provided
                if (msg.payload?.field_boundary) {
                    fieldBoundary = msg.payload.field_boundary;
                } else if (msg.field_boundary) {
                    fieldBoundary = msg.field_boundary;
                }
                
                if (!countyFips || !/^\d{5}$/.test(countyFips)) {
                    node.error('Valid 5-digit county FIPS code required');
                    if (done) done('Valid 5-digit county FIPS code required');
                    return;
                }
                
                if (!cropType) {
                    node.error('Crop type required');
                    if (done) done('Crop type required');
                    return;
                }
                
                if (!inputType || !['fertilizer', 'pesticide', 'water'].includes(inputType)) {
                    node.error('Input type must be fertilizer, pesticide, or water');
                    if (done) done('Input type must be fertilizer, pesticide, or water');
                    return;
                }
                
                if (!fieldBoundary || typeof fieldBoundary !== 'object') {
                    node.error('Valid field boundary GeoJSON required');
                    if (done) done('Valid field boundary GeoJSON required');
                    return;
                }
                
                const baseUrl = node.config.getBaseUrl();
                const url = `${baseUrl}/${node.endpoint}`;
                
                node.status({ fill: 'blue', shape: 'dot', text: 'Generating prescription...' });
                
                const response = await axios.post(url, {
                    county_fips: countyFips,
                    field_boundary: fieldBoundary,
                    crop_type: cropType,
                    input_type: inputType,
                    output_format: outputFormat
                }, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 60000 // Longer timeout for complex prescriptions
                });
                
                node.status({ fill: 'green', shape: 'dot', text: 'Prescription generated' });
                
                // Process response
                const data = response.data;
                
                // Format output
                let output = {
                    county_fips: countyFips,
                    crop_type: cropType,
                    input_type: inputType,
                    output_format: outputFormat,
                    prescription_id: data.prescription_id,
                    generated_at: data.generated_at,
                    total_area: data.total_area,
                    estimated_cost: data.estimated_cost,
                    estimated_savings: data.estimated_savings,
                    environmental_impact: data.environmental_impact
                };
                
                // Add prescription data based on format
                if (outputFormat === 'geojson' && data.prescription_geojson) {
                    output.prescription = data.prescription_geojson;
                } else if (outputFormat === 'json' && data.prescription_json) {
                    output.prescription = data.prescription_json;
                } else if (data.prescription_data) {
                    output.prescription = data.prescription_data;
                }
                
                // Add application rates summary
                if (data.application_rates) {
                    output.application_rates = data.application_rates;
                }
                
                // Add zoning information
                if (data.zones) {
                    output.zones = data.zones;
                    output.zone_count = data.zones.length;
                }
                
                // Add equipment compatibility
                if (data.equipment_compatibility) {
                    output.equipment_compatibility = data.equipment_compatibility;
                }
                
                // Add confidence scores
                if (data.confidence_scores) {
                    output.confidence_scores = data.confidence_scores;
                }
                
                // Add recommendations
                if (data.recommendations) {
                    output.recommendations = data.recommendations;
                }
                
                // Set message properties
                msg.payload = output;
                msg.topic = `prescription/${inputType}/${countyFips}`;
                msg.leafengines = {
                    endpoint: node.endpoint,
                    county_fips: countyFips,
                    crop_type: cropType,
                    input_type: inputType,
                    output_format: outputFormat,
                    field_area: data.total_area,
                    timestamp: new Date().toISOString(),
                    cache_hit: data.cache_info?.level !== 'origin',
                    response_time: response.headers?.['x-response-time'] || 'unknown',
                    prescription_id: data.prescription_id
                };
                
                // If prescription is large, consider storing as attachment
                if (data.prescription_geojson && data.prescription_geojson.length > 10000) {
                    msg.prescription_large = true;
                    msg.prescription_size = data.prescription_geojson.length;
                }
                
                send(msg);
                if (done) done();
                
                // Clear status after 3 seconds
                setTimeout(() => {
                    node.status({});
                }, 3000);
                
            } catch (error) {
                node.status({ fill: 'red', shape: 'ring', text: 'Error' });
                
                let errorMessage = 'Failed to generate prescription';
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
    
    RED.nodes.registerType("leafengines-prescription", LeafEnginesPrescriptionNode);
};