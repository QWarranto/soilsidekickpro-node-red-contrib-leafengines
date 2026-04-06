/**
 * Basic test for LeafEngines Node-RED nodes
 * Run with: npm test
 */

const helper = require('node-red-node-test-helper');
const leafenginesNodes = require('../nodes/config.js');
const soilNode = require('../nodes/soil.js');
const queryNode = require('../nodes/query.js');

// Mock axios for testing
const mockAxios = {
  post: async (url, data, config) => {
    const endpoint = url.split('/').pop();
    
    const mockResponses = {
      'get-soil-data': {
        data: {
          county_fips: data.county_fips,
          soil_texture: 'Clay Loam',
          organic_matter: 2.4,
          ph_level: 6.8,
          drainage_class: 'Well drained',
          nitrogen: 45,
          phosphorus: 32,
          potassium: 210,
          cache_info: {
            level: 'L2',
            age_seconds: 3600,
            stale: false
          }
        },
        headers: {
          'x-response-time': '45ms',
          'x-cache-hit': 'true'
        },
        status: 200
      },
      'county-lookup': {
        data: {
          term: data.term,
          results: [
            {
              fips: '06055',
              name: 'Napa County',
              state: 'CA'
            }
          ],
          cache_info: {
            level: 'L1',
            age_seconds: 300,
            stale: false
          }
        },
        status: 200
      },
      'mcp-server': {
        data: [
          {
            jsonrpc: '2.0',
            id: 'req_1',
            result: {
              content: [{ type: 'text', text: 'Mock MCP response' }]
            }
          }
        ],
        status: 200
      }
    };
    
    const response = mockResponses[endpoint] || { 
      data: { error: 'Endpoint not found' },
      status: 404
    };
    
    return Promise.resolve(response);
  }
};

// Mock axios module
require.cache[require.resolve('axios')] = {
  exports: mockAxios
};

helper.init(require.resolve('node-red'));

describe('LeafEngines Nodes', function() {
    beforeEach(function(done) {
        helper.startServer(done);
    });

    afterEach(function(done) {
        helper.unload();
        helper.stopServer(done);
    });

    describe('Configuration Node', function() {
        it('should be loaded', function(done) {
            const flow = [{ id: 'n1', type: 'leafengines-config', name: 'test-config' }];
            helper.load(leafenginesNodes, flow, function() {
                const n1 = helper.getNode('n1');
                n1.should.have.property('name', 'test-config');
                done();
            });
        });

        it('should validate API key format', function(done) {
            const flow = [{
                id: 'n1', 
                type: 'leafengines-config', 
                name: 'test-config',
                apiKey: 'ak_sandbox_test123'
            }];
            
            helper.load(leafenginesNodes, flow, function() {
                const n1 = helper.getNode('n1');
                n1.isValidKey().should.be.true;
                done();
            });
        });

        it('should reject invalid API key format', function(done) {
            const flow = [{
                id: 'n1', 
                type: 'leafengines-config', 
                name: 'test-config',
                apiKey: 'invalid-key'
            }];
            
            helper.load(leafenginesNodes, flow, function() {
                const n1 = helper.getNode('n1');
                n1.isValidKey().should.be.false;
                done();
            });
        });
    });

    describe('Soil Analysis Node', function() {
        it('should be loaded', function(done) {
            const flow = [
                { id: 'n1', type: 'leafengines-config', name: 'config', apiKey: 'ak_sandbox_test' },
                { id: 'n2', type: 'leafengines-soil', name: 'soil', config: 'n1', countyFips: '48453' }
            ];
            
            helper.load([leafenginesNodes, soilNode], flow, function() {
                const n2 = helper.getNode('n2');
                n2.should.have.property('name', 'soil');
                n2.should.have.property('countyFips', '48453');
                done();
            });
        });

        it('should require configuration', function(done) {
            const flow = [
                { id: 'n2', type: 'leafengines-soil', name: 'soil', countyFips: '48453' }
            ];
            
            helper.load([leafenginesNodes, soilNode], flow, function() {
                const n2 = helper.getNode('n2');
                // Node should have error state
                done();
            });
        });
    });

    describe('Query Node', function() {
        it('should be loaded', function(done) {
            const flow = [
                { id: 'n1', type: 'leafengines-config', name: 'config', apiKey: 'ak_sandbox_test' },
                { id: 'n2', type: 'leafengines-query', name: 'query', config: 'n1', endpoint: 'get-soil-data' }
            ];
            
            helper.load([leafenginesNodes, queryNode], flow, function() {
                const n2 = helper.getNode('n2');
                n2.should.have.property('name', 'query');
                n2.should.have.property('endpoint', 'get-soil-data');
                done();
            });
        });

        it('should support different endpoints', function(done) {
            const flow = [
                { id: 'n1', type: 'leafengines-config', name: 'config', apiKey: 'ak_sandbox_test' },
                { id: 'n2', type: 'leafengines-query', name: 'query', config: 'n1', endpoint: 'county-lookup' }
            ];
            
            helper.load([leafenginesNodes, queryNode], flow, function() {
                const n2 = helper.getNode('n2');
                n2.should.have.property('endpoint', 'county-lookup');
                done();
            });
        });
    });
});

// Mock API responses for testing
const mockResponses = {
    'get-soil-data': {
        county_fips: '48453',
        soil_texture: 'Clay Loam',
        organic_matter: 2.4,
        ph_level: 6.8,
        drainage_class: 'Well drained',
        nitrogen: 45,
        phosphorus: 32,
        potassium: 210,
        cache_info: {
            level: 'L2',
            age_seconds: 3600,
            stale: false
        },
        confidence_intervals: {
            organic_matter: { lower: 2.1, upper: 2.7, confidence: 0.95 },
            ph_level: { lower: 6.5, upper: 7.1, confidence: 0.95 }
        }
    },
    'county-lookup': {
        term: 'Napa',
        results: [
            {
                fips: '06055',
                name: 'Napa County',
                state: 'CA',
                state_fips: '06',
                centroid: { lat: 38.5025, lon: -122.2653 }
            }
        ],
        cache_info: {
            level: 'L1',
            age_seconds: 300,
            stale: false
        }
    },
    'territorial-water-quality': {
        fips: '48453',
        water_quality_index: 78,
        contaminants: [
            { name: 'Nitrate', level: 4.2, unit: 'mg/L', limit: 10 },
            { name: 'Phosphate', level: 0.8, unit: 'mg/L', limit: 1 }
        ],
        monitoring_stations: 3,
        last_sample_date: '2026-04-05',
        cache_info: {
            level: 'L3',
            age_seconds: 86400,
            stale: false
        }
    }
};

// Export for use in other tests
module.exports = {
    mockResponses,
    helper
};