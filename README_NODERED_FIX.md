# node-red-contrib-leafengines

[![npm version](https://img.shields.io/npm/v/node-red-contrib-leafengines.svg)](https://www.npmjs.com/package/node-red-contrib-leafengines)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**LeafEngines Agricultural Intelligence nodes for Node-RED** - IoT and edge computing for agriculture.

## 🚀 Quick Start

### 1. Installation
```bash
npm install node-red-contrib-leafengines
```

### 2. Get Your API Key
#### **Test API (Try Now):**
Use test key: `leaf-test-370df0a2e62e`

**Works with just county_fips:**
```json
{
  "county_fips": "12086"
}
```

#### **Free Tier (No API Key):**
Use header: `x-free-tier: true`

#### **Production API Key:**
Request at: https://soilsidekickpro.com/api-docs

### 3. Configure in Node-RED
1. Open Node-RED palette manager
2. Install `node-red-contrib-leafengines`
3. Add LeafEngines credentials with your API key
4. Select Free tier to start

### 4. Create Your First Flow
```
[Inject] → [LeafEngines Soil] → [Debug] → [Dashboard]
```

## 📊 Available Nodes

### **Currently Available:**
- **LeafEngines Soil** - USDA soil composition and health scoring
- **LeafEngines Water** - EPA water quality monitoring
- **LeafEngines Crop** - AI crop recommendations
- **LeafEngines Batch** - Optimized batch processing

### **Available in SoilSidekick Pro API:**
- LeafEngines Environmental - Environmental impact scoring
- LeafEngines Satellite - Google Earth Engine integration
- LeafEngines AI Chat - Advanced conversational AI
- LeafEngines Visual - Visual crop analysis

*Note: These additional features are available through the SoilSidekick Pro API and can be accessed via HTTP Request nodes in Node-RED. Dedicated Node-RED nodes for these features are developed based on community demand.*

## 🎯 Why Node-RED for Agriculture?

Node-RED provides IoT and edge computing capabilities perfect for agricultural applications:

| Use Case | Node-RED Advantage |
|----------|-------------------|
| **Edge Computing** | Run on Raspberry Pi, industrial gateways |
| **IoT Integration** | Connect sensors, cameras, weather stations |
| **Local Processing** | Process data offline, reduce cloud dependency |
| **Agricultural Automation** | Real-time monitoring, alerts, control systems |

## 🔧 Available Nodes

### LeafEngines Soil
Retrieve USDA soil data for any US location.

**Inputs:**
- County & State
- Latitude & Longitude (optional)
- Soil depth preference

**Outputs:**
- Soil composition (sand, silt, clay)
- Nutrient levels (N, P, K)
- Drainage classification
- Health score (0-100)

### LeafEngines Water
EPA water quality monitoring data.

**Inputs:**
- Water body ID or location
- Time range

**Outputs:**
- Contaminant levels
- Water quality index
- Safety recommendations

### LeafEngines Crop
AI-powered crop recommendations.

**Inputs:**
- Location
- Soil data
- Historical yield

**Outputs:**
- Recommended crops
- Planting schedule
- Expected yield

### LeafEngines Batch
Process multiple locations efficiently.

**Inputs:**
- Array of locations
- Processing options

**Outputs:**
- Batch results
- Summary statistics
- Error handling

## 📖 Example Flows

### Example 1: Automated Soil Monitoring
```json
[{"id":"n1","type":"inject","z":"flow1","name":"","props":[],"repeat":"","crontab":"0 8 * * 1","once":false,"onceDelay":0.1,"topic":"","payload":"","payloadType":"date","x":150,"y":100,"wires":[["n2"]]},
{"id":"n2","type":"leafengines-soil","z":"flow1","name":"Fulton County Soil","county":"Fulton","state":"GA","x":350,"y":100,"wires":[["n3"]]},
{"id":"n3","type":"debug","z":"flow1","name":"","active":true,"tosidebar":true,"console":false,"tostatus":false,"complete":"false","statusVal":"","statusType":"auto","x":550,"y":100,"wires":[]}]
```

### Example 2: Farm Dashboard
- **Input:** Multiple sensor streams
- **Processing:** Real-time soil/water analysis
- **Output:** Dashboard visualization
- **Integration:** MQTT, InfluxDB, Grafana

## ⚙️ Configuration

### API Access
- **Free Tier:** 100 requests/month
- **Starter Tier:** 1,000 requests/month, $49/month
- **Pro Tier:** 10,000 requests/month, $149/month
- **Enterprise:** Custom volumes, contact sales

### Authentication
1. Request API key from SoilSidekick Pro
2. Configure in Node-RED credentials
3. Select appropriate tier for your needs

## 🔗 Related Packages

- **[n8n-nodes-leafengines](https://www.npmjs.com/package/n8n-nodes-leafengines)** - For business automation and workflows
- **[@ancientwhispers54/leafengines-mcp-server](https://www.npmjs.com/package/@ancientwhispers54/leafengines-mcp-server)** - For AI agent integration
- **[@soilsidekick/sdk](https://www.npmjs.com/package/@soilsidekick/sdk)** - Core JavaScript SDK for custom integrations

## 🤝 Community & Development

This package is actively developed with feedback from the Node-RED and agricultural communities. We welcome:
- **Feature requests** for additional Node-RED nodes
- **Bug reports** and improvement suggestions
- **Use case examples** from agricultural IoT projects

## 📄 License

MIT License

Copyright (c) 2026 SoilSidekick Pro

## 📞 Support

- **Documentation:** [LeafEngines Node-RED Guide](https://docs.leafengines.com/node-red)
- **GitHub Issues:** [Feature Requests & Bugs](https://github.com/QWarranto/node-red-contrib-leafengines/issues)
- **Email:** support@soilsidekickpro.com
- **Community:** [Node-RED Forum](https://discourse.nodered.org)