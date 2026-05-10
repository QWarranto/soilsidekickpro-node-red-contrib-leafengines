/**
 * LeafEngines Configuration Node for Node-RED
 * Provides API key management and connection settings
 */

const axios = require('axios');

// Telemetry ingestion endpoint (anonymous, opt-out available via NO_ANALYTICS=1)
const TELEMETRY_INGEST_ENDPOINT = 'https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/telemetry-ingest';
const TELEMETRY_VERSION = '1.0.6';
const ENABLE_TELEMETRY = process.env.NO_ANALYTICS !== '1';

module.exports = function(RED) {
    function LeafEnginesConfigNode(config) {
        RED.nodes.createNode(this, config);
        
        this.name = config.name;
        this.apiKey = config.apiKey || 'leaf-test-370df0a2e62e';
        this.apiUrl = config.apiUrl || 'https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/get-soil-data';
        this.tier = config.tier || 'free';
        
        // Store credentials securely
        if (this.credentials && this.credentials.apiKey) {
            this.apiKey = this.credentials.apiKey;
        }
        
        // Validate API key format
        this.isValidKey = () => {
            if (!this.apiKey) return true; // Free tier allowed
            return this.apiKey.startsWith('ak_') || this.apiKey === 'leaf-test-370df0a2e62e';
        };
        
        // Get base URL based on tier
        this.getBaseUrl = () => {
            if (this.apiUrl.includes('[project]')) {
                // Extract project from API key if possible
                const parts = this.apiKey.split('_');
                if (parts.length >= 3 && parts[0] === 'ak') {
                    const project = parts[1];
                    return this.apiUrl.replace('[project]', project);
                }
            }
            return this.apiUrl;
        };
        
        // Get rate limits based on tier
        this.getRateLimits = () => {
            const limits = {
                sandbox: { perMinute: 10, perDay: 1000, concurrent: 2, batchSize: 5 },
                free: { perMinute: 10, perDay: 1000, concurrent: 2, batchSize: 5 },
                starter: { perMinute: 30, perDay: 5000, concurrent: 5, batchSize: 10 },
                pro: { perMinute: 100, perDay: 25000, concurrent: 10, batchSize: 25 },
                enterprise: { perMinute: 500, perDay: 100000, concurrent: 25, batchSize: 50 }
            };
            
            return limits[this.tier] || limits.sandbox;
        };

        // Telemetry helper shared across all LeafEngines nodes
        this.sendTelemetry = async function(event) {
            if (!ENABLE_TELEMETRY) return;
            try {
                await axios.post(
                    TELEMETRY_INGEST_ENDPOINT,
                    {
                        ...event,
                        surface: event.surface || 'node-red',
                        event_type: event.event_type || 'tool_call',
                    },
                    {
                        timeout: 1000,
                        headers: {
                            'x-surface': event.surface || 'node-red',
                            'x-client-version': TELEMETRY_VERSION,
                        },
                    }
                );
            } catch {
                // Silently fail — telemetry must never block user flows
            }
        };
    }
    
    RED.nodes.registerType("leafengines-config", LeafEnginesConfigNode, {
        credentials: {
            apiKey: { type: "password" }
        }
    });
    
    // Add helper function for other nodes to access config
    RED.httpAdmin.get('/leafengines/endpoints', function(req, res) {
        const endpoints = [
            {
                name: 'get-soil-data',
                description: 'USDA soil composition by county FIPS',
                category: 'soil',
                tier: 'free',
                inputSchema: {
                    county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true }
                }
            },
            {
                name: 'county-lookup',
                description: 'Geographic resolution (name/state → FIPS code)',
                category: 'geography',
                tier: 'free',
                inputSchema: {
                    term: { type: 'string', required: true },
                    state: { type: 'string', required: false }
                }
            },
            {
                name: 'territorial-water-quality',
                description: 'EPA water quality monitoring',
                category: 'water',
                tier: 'starter',
                inputSchema: {
                    fips: { type: 'string', pattern: '^[0-9]{5}$', required: true }
                }
            },
            {
                name: 'multi-parameter-planting-calendar',
                description: 'Multi-parameter planting optimization',
                category: 'crop',
                tier: 'starter',
                inputSchema: {
                    county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true },
                    crop_type: { type: 'string', required: false },
                    planting_date: { type: 'string', format: 'date', required: false }
                }
            },
            {
                name: 'carbon-credit-calculator',
                description: 'Carbon credit estimation',
                category: 'carbon',
                tier: 'pro',
                inputSchema: {
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
                inputSchema: {
                    county_fips: { type: 'string', pattern: '^[0-9]{5}$', required: true },
                    field_boundary: { type: 'object', required: true },
                    crop_type: { type: 'string', required: true },
                    input_type: { type: 'string', enum: ['fertilizer', 'pesticide', 'water'], required: true }
                }
            }
        ];
        
        res.json(endpoints);
    });
};