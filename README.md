# node-red-contrib-leafengines

[![npm version](https://img.shields.io/npm/v/node-red-contrib-leafengines.svg)](https://www.npmjs.com/package/node-red-contrib-leafengines)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Node-RED nodes for LeafEngines Agricultural Intelligence API. Connect your agricultural automation workflows to soil analysis, crop recommendations, weather data, carbon credit calculations, and more.

## Features

- **20+ Agricultural Intelligence Endpoints** - Soil, water, weather, crop, carbon, and AI analysis
- **Tier-Based Access Control** - Automatically respects Free, Starter, Pro, and Enterprise rate limits
- **Offline-First Architecture** - Built-in caching with formal uncertainty quantification
- **MCP Protocol Support** - Compatible with Claude Desktop and other MCP agents
- **Visual Workflow Builder** - Drag-and-drop agricultural intelligence automation

## Installation

### Method 1: Node-RED Palette Manager (Recommended)
1. Open Node-RED (usually at http://localhost:1880)
2. Go to **Menu → Manage Palette**
3. Click **Install** tab
4. Search for `node-red-contrib-leafengines`
5. Click **Install**

### Method 2: npm CLI
```bash
# Install globally for all Node-RED instances
npm install -g node-red-contrib-leafengines

# Or install locally to your Node-RED user directory
cd ~/.node-red
npm install node-red-contrib-leafengines
```

### Method 3: Manual Installation
```bash
cd ~/.node-red
npm install https://github.com/soilsidekickpro/node-red-contrib-leafengines.git
```

## Quick Start

### 1. Get Your API Key
1. Visit [soilsidekickpro.com/podcast](https://soilsidekickpro.com/podcast) for podcast-exclusive access
2. Request your sandbox API key (`ak_sandbox_*`)
3. Receive key via email (typically within a few hours)

### 2. Configure LeafEngines
1. Drag a **LeafEngines Config** node to your flow
2. Double-click to configure:
   - **Name**: Your configuration name
   - **API Key**: Your `ak_sandbox_*` key
   - **API URL**: `https://[project].supabase.co/functions/v1`
   - **Tier**: Select your subscription tier

### 3. Create Your First Soil Analysis Flow
```
[inject] → [LeafEngines Soil] → [debug]
```

Configure the **LeafEngines Soil** node:
- **Configuration**: Select your config node
- **County FIPS**: Enter a 5-digit FIPS code (e.g., `48453` for Napa County, CA)
- **Output Format**: Choose `Full Analysis`, `Summary Only`, or `Minimal Data`

### 4. Deploy and Test
1. Click **Deploy**
2. Click the inject node button
3. Check debug panel for soil analysis results

## Available Nodes

### Configuration Nodes
- **LeafEngines Config** - API key management and connection settings

### Specialized Data Nodes
- **LeafEngines Soil** - USDA soil composition by county FIPS (Free tier)
- **LeafEngines Weather** - Live weather and soil fusion data (Starter tier)
- **LeafEngines Water** - EPA water quality monitoring and analytics (Starter tier)
- **LeafEngines Crop** - AI crop recommendations, planting calendars, and plant identification (Starter/Pro tier)
- **LeafEngines Carbon** - Carbon credit estimation with practice change analysis (Pro tier)
- **LeafEngines Prescription** - Variable-rate prescription generation (Pro tier)

### Optimization Nodes
- **LeafEngines Batch** - Batch multiple API calls into single requests (optimizes rate limits)
- **LeafEngines Query** - Generic node for any LeafEngines endpoint

### Coming Soon Nodes
- **LeafEngines Environmental** - Environmental impact scoring and risk assessment
- **LeafEngines Satellite** - Google Earth Engine satellite integration
- **LeafEngines AI Chat** - Advanced conversational AI (Enterprise tier)
- **LeafEngines Visual** - Visual crop analysis and diagnostics

## Example Flows

### 1. Automated Soil Health Monitoring
```javascript
// Flow: Daily soil analysis with alerting
[schedule: daily 8am] → [LeafEngines Soil] → [function: check thresholds] → [switch: alert if needed] → [email/sms alert]
```

### 2. Irrigation Optimization
```javascript
// Flow: Smart irrigation scheduling
[weather forecast] → [LeafEngines Soil] → [LeafEngines Water] → [function: calculate irrigation] → [sprinkler controller]
```

### 3. Carbon Credit Reporting
```javascript
// Flow: Automated carbon credit calculation
[field sensor data] → [LeafEngines Carbon] → [function: format report] → [Google Sheets] → [email report]
```

### 4. Variable-Rate Application
```javascript
// Flow: Real-time prescription generation
[GPS position] → [LeafEngines Soil] → [LeafEngines Prescription] → [function: format for equipment] → [sprayer controller]
```

### 5. Batch-Optimized Field Analysis
```javascript
// Flow: Comprehensive analysis with batch optimization
[field parameters] → [prepare batch requests] → [LeafEngines Batch] → [combine results] → [field health score] → [report]
```

### 6. Carbon Credit Automation
```javascript
// Flow: Automated carbon credit reporting
[field data] → [LeafEngines Carbon] → [practice change analysis] → [report generator] → [regulatory submission]
```

## API Endpoints by Tier

### Free Tier (2 endpoints)
- `get-soil-data` - USDA soil composition
- `county-lookup` - Geographic resolution

### Starter Tier ($149/mo, 8 endpoints)
- All Free tier endpoints plus:
- `territorial-water-quality` - EPA water monitoring
- `multi-parameter-planting-calendar` - Planting optimization
- `live-agricultural-data` - Weather/soil fusion
- `environmental-impact-engine` - Risk scoring
- `safe-identification` - Plant ID with toxic lookalike warnings

### Pro Tier ($499/mo, 7 endpoints)
- All Starter tier endpoints plus:
- `agricultural-intelligence` - AI crop recommendations
- `carbon-credit-calculator` - Carbon credit estimation
- `generate-vrt-prescription` - Variable-rate prescriptions
- `leafengines-query` - Natural language interface

### Enterprise Tier ($1,999/mo, 3 endpoints)
- All Pro tier endpoints plus:
- `gpt5-chat` - Advanced conversational AI
- `visual-crop-analysis` - Visual diagnostics
- `geo-consumption-analytics` - Geographic pattern analysis

## Rate Limits & Batch Optimization

### Standard Rate Limits
| Tier | Requests/Minute | Requests/Day | Concurrent | Batch Size |
|------|----------------|--------------|------------|------------|
| Free | 10 | 1,000 | 2 | 5 |
| Starter | 30 | 5,000 | 5 | 10 |
| Pro | 100 | 25,000 | 10 | 25 |
| Enterprise | 500 | 100,000 | 25 | 50 |

### Effective Rate Limits with Batching
| Tier | Individual Calls | With Batching (5 calls/batch) | Improvement |
|------|------------------|--------------------------------|-------------|
| Free | 10/min | **50/min** | 5x |
| Starter | 30/min | **150/min** | 5x |
| Pro | 100/min | **500/min** | 5x |
| Enterprise | 500/min | **2,500/min** | 5x |

**Batch Optimization Tip**: A single POST containing multiple JSON-RPC calls counts as 1 rate-limited request. The `LeafEngines Batch` node automatically optimizes multiple API calls into single batch requests.

### Batch Optimization Examples
1. **Soil + Water + Weather Analysis** (3 calls) → **1 batch request** (66% reduction)
2. **Multi-County Comparison** (5 counties) → **1 batch request** (80% reduction)
3. **Full Field Analysis** (8 endpoints) → **2 batch requests** (75% reduction)

See `examples/batch-optimization.json` for a complete implementation.

## MCP Protocol Integration

LeafEngines implements the Model Context Protocol (MCP), enabling AI agents to discover and invoke agricultural intelligence tools natively.

### Claude Desktop Configuration
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "leafengines": {
      "transport": "streamable-http",
      "url": "https://[project].supabase.co/functions/v1/mcp-server",
      "headers": {
        "x-api-key": "ak_sandbox_your_key_here"
      }
    }
  }
}
```

### OpenClaw Integration
LeafEngines appears as a discoverable MCP server in OpenClaw. Agents can:
- Discover available tools via `tools/list`
- Invoke tools with typed parameters
- Batch multiple operations in single requests

## Data Integrity Guarantees

LeafEngines provides formal data integrity guarantees:

1. **Provenance Tracking** - Chain of custody from source to decision
2. **Formal Uncertainty** - Calibrated confidence intervals on all outputs
3. **Cryptographic Integrity** - SHA-256 validation of cached data
4. **Temporal Consistency** - Data staleness bounds per data type
5. **Compliance-Ready Audit Trail** - SOC 2-aligned logging

## Performance Benchmarks

| Endpoint | P50 Latency | P95 Latency | Cache Hit Rate |
|----------|-------------|-------------|----------------|
| get-soil-data | 12ms | 45ms | 94% |
| county-lookup | 8ms | 32ms | 97% |
| territorial-water-quality | 85ms | 210ms | 78% |
| carbon-credit-calculator | 45ms | 120ms | 85% |

## Troubleshooting

### Common Issues

1. **"Invalid API key" error**
   - Verify your key starts with `ak_`
   - Check for typos or extra spaces
   - Ensure you're using the correct tier configuration

2. **"Network error: No response received"**
   - Check your internet connection
   - Verify the API URL is correct
   - Check firewall/network restrictions

3. **Rate limit errors**
   - Check your tier's rate limits
   - Implement batch operations for multiple calls
   - Add delay nodes between calls if needed

4. **"County FIPS must be 5 digits"**
   - Use 5-digit FIPS codes only
   - Find codes at: [EPA FIPS Code Search](https://www.epa.gov/waterdata/fips-code-search)

### Debug Mode
Enable detailed logging:
```bash
# Start Node-RED with debug logging
node-red --verbose

# Or set environment variable
export DEBUG=node-red-contrib-leafengines*
node-red
```

## Contributing

We welcome contributions! The LeafEngines Contributor Program provides API access and recognition for developers who extend the platform.

### Contribution Tracks
1. **Integration Developer** - Build Node-RED nodes, n8n workflows, Zapier actions
2. **Data Connector** - Add new data source adapters
3. **Domain Expert** - Crop-specific model validation, regional calibration
4. **Security Researcher** - Responsible disclosure, penetration testing

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## Support

- **Technical Support**: support@soilsidekickpro.com
- **Enterprise Sales**: sales@leafengines.com
- **Contributor Program**: contributors@leafengines.com
- **API Documentation**: [soilsidekickpro.com/api-docs](https://soilsidekickpro.com/api-docs)
- **GitHub Issues**: [github.com/soilsidekickpro/node-red-contrib-leafengines/issues](https://github.com/soilsidekickpro/node-red-contrib-leafengines/issues)

## License

MIT License - see [LICENSE](LICENSE) file for details.

## Acknowledgments

- USDA Natural Resources Conservation Service for soil data
- EPA for water quality monitoring data
- Google Earth Engine for satellite imagery
- Anthropic for Model Context Protocol specification
- Node-RED community for the amazing low-code platform

---

**Podcast Listeners**: Visit [soilsidekickpro.com/podcast](https://soilsidekickpro.com/podcast) for exclusive Founders Series API keys with lifetime preferential pricing.