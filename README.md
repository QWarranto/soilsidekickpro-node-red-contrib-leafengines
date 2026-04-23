# node-red-contrib-leafengines

**Agricultural Intelligence Automation for Node-RED**

[![npm version](https://img.shields.io/npm/v/node-red-contrib-leafengines.svg)](https://www.npmjs.com/package/node-red-contrib-leafengines)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 🚀 **TRY IT NOW - NO API KEY NEEDED!**

### **Free Tier Access (Immediate):**
- **Soil analysis** for any US county
- **No signup required** - just use `x-free-tier: true` header
- **Instant value** - get USDA soil data in seconds
- **Upgrade later** - only when you need more calls

### **🌍 Community Success: 1,000+ Views in <48 Hours!**
The LeafEngines Node-RED plugin has gained rapid traction:
- **1,000+ views** in r/NodeRED community (<48 hours)
- **42 downloads** across **8 countries** (and growing)
- **12 production-ready implementations** available
- **Perfect for** agricultural IoT, farm automation, precision agriculture

---

## 🎯 Quick Start (Free Tier First!)

### **Free Tier Access (Immediate):**
- **Soil analysis** for any US county
- **No signup required** - just use `x-free-tier: true` header
- **Instant value** - get USDA soil data in seconds
- **Upgrade later** - only when you need more calls

### **🌍 Community Success: 1,000+ Views in <48 Hours!**
The LeafEngines Node-RED plugin has gained rapid traction:
- **1,000+ views** in r/NodeRED community (<48 hours)
- **42 downloads** across **8 countries** (and growing)
- **12 production-ready implementations** available
- **Perfect for** agricultural IoT, farm automation, precision agriculture

---

## 🎯 Quick Start (Free Tier First!)

### **Option 1: Free Tier (No API Key)**
```bash
# Try it right now - no signup needed!
curl -H "x-free-tier: true" \
  -X POST https://api.soilsidekickpro.com/v1/soil/analyze \
  -d '{"county_fips": "12086"}'
```

### **Option 2: Test Key (Quick Experimentation)**
```bash
# Use our public test key
curl -H "x-api-key: leaf-test-370df0a2e62e" \
  -X POST https://api.soilsidekickpro.com/v1/soil/analyze \
  -d '{"county_fips": "12086"}'
```

### **Option 3: Production API (When You Need More)**
Only request when free tier limits are exceeded:
1. Visit: https://soilsidekickpro.com/api-docs
2. Choose your plan (Starter, Pro, Enterprise)
3. Get your API key

---

## 📦 Installation

### **Method 1: Node-RED Palette Manager (Recommended)**
1. Open Node-RED (usually at http://localhost:1880)
2. Go to **Menu → Manage Palette**
3. Click **Install** tab
4. Search for `node-red-contrib-leafengines`
5. Click **Install**

### **Method 2: npm CLI**
```bash
npm install node-red-contrib-leafengines
```

### **Method 3: Manual Installation**
```bash
cd ~/.node-red
npm install node-red-contrib-leafengines
```

---

## 🎯 Production Use Cases & Examples

### **📊 12 Production-Ready Implementations:**
1. **Soil Analysis** (`soil.js`) - Real-time USDA soil monitoring
2. **Crop Recommendations** (`crop.js`) - Multi-factor crop planning
3. **Precision Irrigation** (`water.js`) - Weather-based water optimization (30% savings)
4. **Carbon Credits** (`carbon.js`) - Emissions tracking & certification
5. **Weather Integration** (`weather.js`) - Multi-source weather data
6. **Batch Processing** (`batch.js`) - Large-scale farm data workflows
7. **Prescription Maps** (`prescription.js`) - Variable rate applications
8. **Data Queries** (`query.js`) - Advanced query patterns
9. **Configuration** (`config.js`) - Environment management
10. **Quick Testing** (`basic-test.js`) - Connectivity verification

**Download:** [LeafEngines_NodeRED_Use_Cases_By_Tier.pdf](examples/LeafEngines_NodeRED_Use_Cases_By_Tier.pdf) - Complete guide with tiered implementation strategies

**Perfect for:**
- Agricultural IoT developers building sensor networks
- Farm automation engineers optimizing operations
- Sustainability consultants tracking carbon credits
- Research institutions collecting standardized data
- Precision agriculture startups scaling solutions

---

## 🌐 Global IoT & Automation Pricing

Node-RED users deploy automation worldwide. Our pricing supports your global IoT deployments:

**Subscription Plans (Monthly):**

| Region | Starter | Pro | Local Payment Options |
|--------|---------|-----|----------------------|
| **United States** | $49 | $149 | Card, Apple Pay, Google Pay |
| **European Union** | €45 | €135 | Klarna, iDEAL, EPS, Apple/Google Pay |
| **United Kingdom** | £38 | £115 | Afterpay/Clearpay, Apple/Google Pay |
| **Australia** | AU$75 | AU$225 | Afterpay, Apple/Google Pay |
| **International** | $49* | $149* | Credit Cards, Apple/Google Pay |

*Equivalent local currency at checkout

**Why Local Pricing Matters for IoT:**
- Deploy sensors globally with predictable local costs
- Local payment methods reduce friction for team purchases

---

## 🔧 Available Nodes

### **Configuration Nodes**
- **LeafEngines Config** - API key management and connection settings

### **Specialized Data Nodes**
- **LeafEngines Soil** - USDA soil composition by county FIPS (Free tier)
- **LeafEngines Weather** - Live weather and soil fusion data (Starter tier)
- **LeafEngines Water** - EPA water quality monitoring and analytics (Starter tier)
- **LeafEngines Crop** - AI crop recommendations, planting calendars, and plant identification (Starter/Pro tier)
- **LeafEngines Carbon** - Carbon credit estimation with practice change analysis (Pro tier)
- **LeafEngines Prescription** - Variable-rate prescription generation (Pro tier)

### **Optimization Nodes**
- **LeafEngines Batch** - Batch multiple API calls into single requests (optimizes rate limits)
- **LeafEngines Query** - Generic node for any LeafEngines endpoint

### **Enterprise Nodes**
- **LeafEngines Environmental** - Environmental impact scoring and risk assessment
- **LeafEngines Satellite** - Google Earth Engine satellite integration
- **LeafEngines AI Chat** - Advanced conversational AI
- **LeafEngines Visual** - Visual crop analysis and diagnostics

---

## 📖 Example Flows

### **1. Automated Soil Health Monitoring**
```javascript
// Flow: Daily soil analysis with alerting
[schedule: daily 8am] → [LeafEngines Soil] → [function: check thresholds] → [switch: alert if needed] → [email/sms alert]
```

### **2. Irrigation Optimization**
```javascript
// Flow: Smart irrigation scheduling
[weather forecast] → [LeafEngines Soil] → [LeafEngines Water] → [function: calculate irrigation] → [sprinkler controller]
```

### **3. Carbon Credit Reporting**
```javascript
// Flow: Automated carbon credit calculation
[field sensor data] → [LeafEngines Carbon] → [function: format report] → [Google Sheets] → [email report]
```

### **4. Variable-Rate Application**
```javascript
// Flow: Real-time prescription generation
[GPS position] → [LeafEngines Soil] → [LeafEngines Prescription] → [function: format for equipment] → [sprayer controller]
```

---

## 📊 Rate Limits & Batch Optimization

### **Free Tier Limits:**
- **10 requests/minute** - Perfect for testing and small projects
- **1,000 requests/day** - Enough for daily monitoring
- **Batch optimization** - 5x improvement with batching

### **Batch Optimization Examples:**
1. **Soil + Water + Weather Analysis** (3 calls) → **1 batch request** (66% reduction)
2. **Multi-County Comparison** (5 counties) → **1 batch request** (80% reduction)
3. **Full Field Analysis** (8 endpoints) → **2 batch requests** (75% reduction)

See `examples/batch-optimization.json` for complete implementation.

---

## 🔗 MCP Protocol Integration

LeafEngines implements the Model Context Protocol (MCP), enabling AI agents to discover and invoke agricultural intelligence tools natively.

### **Claude Desktop Configuration**
Add to your `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "leafengines": {
      "transport": "streamable-http",
      "url": "https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/mcp-server",
      "headers": {
        "x-api-key": "leaf-test-370df0a2e62e"
      }
    }
  }
}
```

---

## 🎯 QGIS Plugin Officially Approved!

**Plugin ID:** 4987 (LeafEngines Agricultural Intelligence)  
**Version:** 1.0.2 Experimental  
**Status:** ✅ **PUBLICLY AVAILABLE**  
**Download:** https://plugins.qgis.org/plugins/qgis_leafengines/version/1.0.2/download/

### **Key Features:**
- **USDA soil data** - Soil composition, pH, N/P/K recommendations
- **Free tier access** - Try in QGIS with no API key
- **International support** - 8 countries and growing

---

## 🤝 Support & Community

- **Technical Support**: support@soilsidekickpro.com
- **Community Forum**: [r/NodeRED discussions](https://reddit.com/r/nodered)
- **API Documentation**: [soilsidekickpro.com/api-docs](https://soilsidekickpro.com/api-docs)
- **GitHub Issues**: [github.com/QWarranto/node-red-contrib-leafengines/issues](https://github.com/QWarranto/node-red-contrib-leafengines/issues)

**Response Time:** We aim to respond within 24 hours to all support requests.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 🌱 Start Your Agricultural Automation Journey

**Try it now with our free tier - no API key needed!**

1. **Install the package:** `npm install node-red-contrib-leafengines`
2. **Try free tier:** Use `x-free-tier: true` header
3. **Build your flow:** Start with soil analysis
4. **Scale as needed:** Upgrade when you exceed free limits

**Join 1,000+ Node-RED developers** already exploring agricultural intelligence automation!