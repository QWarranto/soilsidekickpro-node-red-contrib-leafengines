/**
 * LeafEngines Batch Node for Node-RED
 * Optimizes multiple API calls into single batch requests
 * Implements JSON-RPC batching as described in white paper section 4.3
 */

const axios = require('axios');

module.exports = function(RED) {
    function LeafEnginesBatchNode(config) {
        RED.nodes.createNode(this, config);
        
        this.config = RED.nodes.getNode(config.config);
        this.batchSize = config.batchSize || 5;
        this.maxConcurrent = config.maxConcurrent || 2;
        this.autoBatch = config.autoBatch !== false;
        
        if (!this.config) {
            this.error('LeafEngines configuration not found');
            return;
        }
        
        if (!this.config.isValidKey()) {
            this.error('Invalid LeafEngines API key format');
            return;
        }
        
        const node = this;
        let batchQueue = [];
        let processing = false;
        let requestCounter = 0;
        
        node.on('input', function(msg, send, done) {
            // Add request to batch queue
            const requestId = `req_${Date.now()}_${++requestCounter}`;
            
            const batchItem = {
                id: requestId,
                msg: msg,
                send: send,
                done: done,
                endpoint: msg.endpoint || msg.payload?.endpoint,
                params: msg.payload || {},
                timestamp: Date.now()
            };
            
            batchQueue.push(batchItem);
            
            // Start processing if not already processing and auto-batch is enabled
            if (node.autoBatch && !processing) {
                setTimeout(() => {
                    processBatch();
                }, 100); // Small delay to allow batching
            }
            
            // If auto-batch is disabled, process immediately when batch size is reached
            if (!node.autoBatch && batchQueue.length >= node.batchSize) {
                processBatch();
            }
        });
        
        async function processBatch() {
            if (processing || batchQueue.length === 0) {
                return;
            }
            
            processing = true;
            node.status({ fill: 'blue', shape: 'dot', text: `Batching ${batchQueue.length} requests` });
            
            try {
                // Take up to batchSize items from queue
                const itemsToProcess = batchQueue.splice(0, node.batchSize);
                
                if (itemsToProcess.length === 1) {
                    // Single request - process directly
                    await processSingleRequest(itemsToProcess[0]);
                } else {
                    // Multiple requests - use JSON-RPC batching
                    await processBatchRequests(itemsToProcess);
                }
                
                node.status({ fill: 'green', shape: 'dot', text: `Processed ${itemsToProcess.length} requests` });
                
            } catch (error) {
                node.status({ fill: 'red', shape: 'ring', text: 'Batch error' });
                node.error(`Batch processing error: ${error.message}`);
                
                // Fail all items in the batch
                itemsToProcess.forEach(item => {
                    if (item.done) {
                        item.done(error.message);
                    }
                });
            } finally {
                processing = false;
                
                // Clear status after 3 seconds
                setTimeout(() => {
                    node.status({});
                }, 3000);
                
                // Process next batch if queue not empty
                if (batchQueue.length > 0) {
                    setTimeout(processBatch, 0);
                }
            }
        }
        
        async function processSingleRequest(item) {
            try {
                const baseUrl = node.config.getBaseUrl();
                const url = `${baseUrl}/${item.endpoint}`;
                
                const response = await axios.post(url, item.params, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                // Prepare response message
                item.msg.payload = response.data;
                item.msg.topic = `leafengines/${item.endpoint}`;
                item.msg.leafengines = {
                    endpoint: item.endpoint,
                    batch: false,
                    batch_size: 1,
                    timestamp: new Date().toISOString(),
                    cache_hit: response.data?.cache_info?.level !== 'origin',
                    response_time: response.headers?.['x-response-time'] || 'unknown'
                };
                
                item.send(item.msg);
                if (item.done) item.done();
                
            } catch (error) {
                handleRequestError(item, error);
            }
        }
        
        async function processBatchRequests(items) {
            try {
                const baseUrl = node.config.getBaseUrl();
                const mcpUrl = `${baseUrl}/mcp-server`;
                
                // Create JSON-RPC batch request
                const batchRequest = items.map((item, index) => ({
                    jsonrpc: '2.0',
                    id: item.id,
                    method: 'tools/call',
                    params: {
                        name: item.endpoint,
                        arguments: item.params
                    }
                }));
                
                const response = await axios.post(mcpUrl, batchRequest, {
                    headers: {
                        'x-api-key': node.config.apiKey,
                        'Content-Type': 'application/json'
                    },
                    timeout: 30000
                });
                
                // Process batch response
                const responses = Array.isArray(response.data) ? response.data : [response.data];
                
                // Map responses back to original items
                const responseMap = {};
                responses.forEach(resp => {
                    if (resp && resp.id) {
                        responseMap[resp.id] = resp;
                    }
                });
                
                // Send individual responses
                items.forEach(item => {
                    const resp = responseMap[item.id];
                    
                    if (resp && !resp.error) {
                        // Successful response
                        item.msg.payload = resp.result;
                        item.msg.topic = `leafengines/${item.endpoint}`;
                        item.msg.leafengines = {
                            endpoint: item.endpoint,
                            batch: true,
                            batch_size: items.length,
                            batch_position: items.indexOf(item) + 1,
                            timestamp: new Date().toISOString(),
                            cache_hit: resp.result?.cache_info?.level !== 'origin'
                        };
                        
                        item.send(item.msg);
                        if (item.done) item.done();
                    } else if (resp && resp.error) {
                        // Error in batch response
                        handleRequestError(item, new Error(resp.error.message || 'Batch request error'));
                    } else {
                        // No response for this item
                        handleRequestError(item, new Error('No response received in batch'));
                    }
                });
                
            } catch (error) {
                // Batch request failed - fail all items
                items.forEach(item => {
                    handleRequestError(item, error);
                });
            }
        }
        
        function handleRequestError(item, error) {
            let errorMessage = `Failed to call ${item.endpoint}`;
            
            if (error.response) {
                errorMessage = `API Error: ${error.response.status} - ${error.response.data?.error || error.response.statusText}`;
            } else if (error.request) {
                errorMessage = 'Network error: No response received';
            } else {
                errorMessage = `Error: ${error.message}`;
            }
            
            item.msg.error = {
                message: errorMessage,
                endpoint: item.endpoint,
                timestamp: new Date().toISOString()
            };
            
            node.error(errorMessage, item.msg);
            if (item.done) item.done(errorMessage);
        }
        
        node.on('close', function() {
            // Process any remaining items in queue
            if (batchQueue.length > 0) {
                node.warn(`Processing ${batchQueue.length} remaining items on close`);
                processBatch();
            }
            node.status({});
        });
    }
    
    RED.nodes.registerType("leafengines-batch", LeafEnginesBatchNode);
    
    // Add batch optimization examples to HTTP admin
    RED.httpAdmin.get('/leafengines/batch-examples', function(req, res) {
        const examples = {
            "soil_water_combo": {
                description: "Batch soil and water quality analysis",
                optimization: "2 requests → 1 batch call = 1 rate-limited request",
                code: `// JSON-RPC batch request
[
  {
    "jsonrpc": "2.0",
    "id": "soil_1",
    "method": "tools/call",
    "params": {
      "name": "get_soil_data",
      "arguments": {
        "county_fips": "48453"
      }
    }
  },
  {
    "jsonrpc": "2.0",
    "id": "water_1",
    "method": "tools/call", 
    "params": {
      "name": "territorial_water_quality",
      "arguments": {
        "fips": "48453"
      }
    }
  }
]`,
                savings: "50% reduction in rate limit usage"
            },
            "multi_county_analysis": {
                description: "Analyze soil for multiple counties",
                optimization: "3 requests → 1 batch call = 1 rate-limited request",
                code: `// Batch multiple counties
[
  {
    "jsonrpc": "2.0",
    "id": "county_1",
    "method": "tools/call",
    "params": {
      "name": "get_soil_data",
      "arguments": {"county_fips": "48453"}
    }
  },
  {
    "jsonrpc": "2.0", 
    "id": "county_2",
    "method": "tools/call",
    "params": {
      "name": "get_soil_data",
      "arguments": {"county_fips": "06055"}
    }
  },
  {
    "jsonrpc": "2.0",
    "id": "county_3",
    "method": "tools/call",
    "params": {
      "name": "get_soil_data", 
      "arguments": {"county_fips": "17031"}
    }
  }
]`,
                savings: "66% reduction in rate limit usage"
            },
            "full_field_analysis": {
                description: "Complete field analysis with multiple data types",
                optimization: "5 requests → 1 batch call = 1 rate-limited request",
                code: `// Comprehensive field analysis
[
  {
    "jsonrpc": "2.0",
    "id": "lookup_1",
    "method": "tools/call",
    "params": {
      "name": "county_lookup",
      "arguments": {"term": "Napa"}
    }
  },
  {
    "jsonrpc": "2.0",
    "id": "soil_1", 
    "method": "tools/call",
    "params": {
      "name": "get_soil_data",
      "arguments": {"county_fips": "06055"}
    }
  },
  {
    "jsonrpc": "2.0",
    "id": "water_1",
    "method": "tools/call",
    "params": {
      "name": "territorial_water_quality",
      "arguments": {"fips": "06055"}
    }
  },
  {
    "jsonrpc": "2.0",
    "id": "weather_1",
    "method": "tools/call",
    "params": {
      "name": "live-agricultural-data",
      "arguments": {
        "county_fips": "06055",
        "data_types": ["weather", "soil_moisture"]
      }
    }
  },
  {
    "jsonrpc": "2.0",
    "id": "carbon_1",
    "method": "tools/call",
    "params": {
      "name": "carbon-credit-calculator",
      "arguments": {
        "county_fips": "06055",
        "acreage": 100,
        "crop_type": "corn"
      }
    }
  }
]`,
                savings: "80% reduction in rate limit usage"
            }
        };
        
        res.json(examples);
    });
};