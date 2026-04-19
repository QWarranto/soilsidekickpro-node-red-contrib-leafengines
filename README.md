
## 🎯 QGIS Plugin Officially Approved!

**Plugin ID:** 4987 (LeafEngines Agricultural Intelligence)  
**Version:** 1.0.2 Experimental  
**Status:** ✅ **PUBLICLY AVAILABLE**  
**Download:** https://plugins.qgis.org/plugins/qgis_leafengines/version/1.0.2/download/

### Key Features:
- **USDA soil data** - Soil composition, pH, N/P/K recommendations
- **EPA water quality** - Water quality metrics and analysis
- **NOAA climate data** - Historical weather patterns and agricultural forecasting
- **Satellite vegetation indices** - NDVI, water-stress overlays from NASA MODIS
- **AI-powered crop recommendations** - Tailored to exact field polygons
- **Carbon credit calculations** - Environmental impact scoring for regulatory compliance
- **Offline-first architecture** - Works in remote/"deep canopy" areas
- **GPS-denied capabilities** - Military-proven algorithms for contested environments

### Strategic Advantages for Partners:
1. **Pre-vetted, low-risk integration** - Officially approved by QGIS after rigorous review
2. **Seamless future-proofing** - Aligns with QGIS release cycles (QGIS 4.0.0+ ready)
3. **Instant credibility** - Discoverable by 500,000+ QGIS users in agriculture sector
4. **Regulatory advantage** - Preferred for government/EPA/USDA-related procurements
5. **Ecosystem power** - Integrates with thousands of complementary QGIS plugins

### For OEM Partners:
Embed LeafEngines agricultural intelligence directly into your hardware or software platforms with confidence. The official QGIS approval eliminates weeks of custom validation, security audits, and compatibility testing.

*Approved: April 14, 2026*


# node-red-contrib-leafengines

Node-RED nodes for LeafEngines agricultural intelligence

## 🎯 Strategic Vision: From AgTech to Universal Infrastructure

**Watch our 7-minute strategic expansion plan:**

[![LeafEngines Strategic Expansion](https://img.youtube.com/vi/bBHVLbh3tx0/0.jpg)](https://youtu.be/bBHVLbh3tx0)

### **The Strategic Pivot:**
LeafEngines is executing a calculated pivot from vertical AgTech to **horizontal infrastructure platform**. We're exploiting a critical global vulnerability: the fragility of satellite-based Positioning, Navigation, and Timing (PNT).

### **Core Mission:**
> **"Space gives the picture. We give the truth."**

### **Key Markets Identified:**
- **Disaster Response** - GPS-denied environments
- **Mining & Forestry** - Remote operations
- **Industrial Automation** - GPS-denied factories
- **Power Grids** - High-precision timing
- **Finance** - MiFID II-compliant timestamps
- **Defense/Intelligence** - Assured PNT in contested theaters

### **Our Advantage:**
- **Offline-first architecture** - Works anywhere, anytime
- **CIP Patent protection** - Inertial Dead Reckoning + Kalman logic
- **Community arbitrage** - Zero-CAC distribution through n8n/Node-RED/MCP
- **Quality transparency** - v3.0.0 confidence scoring & audit trails

### **The Vision:**
Transforming our core technology into a **foundational trust layer for autonomous physical AI** - the mandatory infrastructure for a world requiring GPS-independent verification.

### **💡 How to Use This Video (Developer Tool):**
This video serves as a **non-traditional sales and marketing tool** you can leverage:
- **Internal Stakeholder Alignment:** Share with your team to explain the strategic vision
- **Client Presentations:** Demonstrate the company behind the technology
- **Investor Briefings:** Show the $1.2T horizontal market opportunity
- **Community Building:** Educate other developers about the broader ecosystem

### **🎬 Cinematic Scene Guide:**
**Scene 1: Devices on Bench (0:45-1:15)** - Show hardware integration proof
**Scene 2: Developer Embedding (1:30-2:15)** - Demonstrate integration process
**Scene 3: Buy→Resell→Market (2:30-3:45)** - Explain business model
**Scene 4: Strategic Vision (4:00-5:30)** - Share market opportunity

### **🌐 The Offline AI Economy:**
**Read our philosophical manifesto:** [THE_OFFLINE_AI_ECONOMY.md](https://github.com/soilsidekick/leafengines/blob/main/THE_OFFLINE_AI_ECONOMY.md)

**Core Thesis:** "While much of the AI industry focuses on the size of cloud-based models, those models are unable to execute physical tasks without ground truth integrity."

**Three-Layer Solution:**
1. **Sensor Fusion** - Local dead reckoning without satellites
2. **Kalman Gate** - Uncertainty gating prevents database corruption
3. **Offline-First MCP** - Enables local AI decisions without cloud

**Business Model Revolution:**
- **Filtered Byte Pricing** - Charge for prevented corruption
- **Pay-Per-Agent Action** - Bill for successful high-value tasks
- **Outcome-Based Pricing** - Shift from access to utility

---

## ⚠️ Note: npm page shows outdated instructions
The npm package page (https://www.npmjs.com/package/node-red-contrib-leafengines) currently displays outdated Quick Start instructions. **Ignore the podcast/sandbox key instructions** - use the correct information below.

## 🚀 Quick Start

### 1. Get Your API Key

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

### 2. Install
```bash
npm install node-red-contrib-leafengines
```

### 3. Configure in Node-RED
1. Add LeafEngines node to your flow
2. Enter API key: `leaf-test-370df0a2e62e`
3. Set county_fips: "12086" (or your county)
4. Deploy and test!

---

## 🎯 What This Package Does

This package integrates Node-RED with the LeafEngines agricultural intelligence platform, providing:

- **Soil analysis** from USDA databases
- **Water quality** data from EPA monitoring
- **Climate insights** from NOAA historical records
- **Agricultural recommendations** based on location-specific data

## 📦 Installation

### For {{INTEGRATION_PLATFORM}} Users

```bash
npm install node-red-contrib-leafengines
```

### Configuration

1. **Get API Key:** Sign up at [SoilSidekick Pro](https://soilsidekick.com)
2. **Configure Credentials:** Add your API key in {{INTEGRATION_PLATFORM}}
3. **Start Using:** The nodes will appear in your palette

## 🚀 Quick Start

### Basic Usage

```{{EXAMPLE_LANGUAGE}}
{{EXAMPLE_CODE}}
```

### Example Workflow

1. **Location Input:** Provide county/coordinates
2. **Data Retrieval:** Automatically fetch soil/water/climate data
3. **Analysis:** Get actionable agricultural insights
4. **Automation:** Integrate with other {{INTEGRATION_PLATFORM}} nodes

## 🔧 Available Nodes

### {{MAIN_NODE_NAME}}
Main node for county-based lookups and batch processing.

**Inputs:**
- County name
- State abbreviation
- Coordinates (optional)

**Outputs:**
- Complete environmental analysis
- Agricultural recommendations
- Risk assessments

### SoilData Node
Specialized node for detailed soil analysis.

**Features:**
- Soil composition breakdown
- Nutrient levels
- Drainage characteristics
- Suitability scoring

## 📖 Examples

### Example 1: Basic County Lookup
```{{EXAMPLE_LANGUAGE}}
{{BASIC_EXAMPLE}}
```

### Example 2: Automated Farm Planning
```{{EXAMPLE_LANGUAGE}}
{{ADVANCED_EXAMPLE}}
```

## ⚙️ Configuration Options

### API Tiers
- **Free Tier:** 100 requests/month
- **Starter Tier:** 1,000 requests/month ($49/month)
- **Pro Tier:** 10,000 requests/month ($149/month)

### Rate Limiting
- Free: 10 requests/minute
- Paid: 100 requests/minute

## 🔗 Related Packages

- [@soilsidekick/sdk]({{SDK_URL}}) - Core JavaScript SDK
- [@ancientwhispers54/leafengines-mcp-server]({{MCP_URL}}) - AI agent integration
- [Other integration]({{OTHER_URL}}) - {{OTHER_PLATFORM}}

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide]({{CONTRIBUTING_URL}}).

## 📄 License

## 📄 License

MIT License

Copyright (c) {{YEAR}} {{COMPANY_NAME}}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 📞 Support

- **Documentation:** [LeafEngines Docs]({{DOCS_URL}})
- **GitHub Issues:** [Report Bugs]({{ISSUES_URL}})
- **Community:** [Join Discussion]({{COMMUNITY_URL}})
