# node-red-contrib-leafengines — Agricultural Intelligence for Node-RED

**Soil analysis, crop recommendations, and environmental intelligence** for Node-RED IoT/edge automation. Patent-protected algorithms. Works with free test key — no signup required.

## ⚡ Get Started Now

**Free tier — no signup, no credit card:**
- **Test key:** `leaf-test-370df0a2e62e` (works immediately with any API call)
- **Free header:** `x-free-tier: true` (no key needed at all)

**Ready for production?**
- [Starter — $149/mo →](https://buy.stripe.com/5kQ6oHcB88bR93s8MSaMU04)
- [Pro — $499/mo →](https://buy.stripe.com/14A6oH7gO3VBcfE1kqaMU05)

**Partner Program:** Stop building for free. Use our API to sell $100–200 soil reports to local farmers, drone pilots, and GIS communities. You buy each report for $25. [Join our Partner Program →](https://soilcertify.com)

**Preliminary Site Scan - SoilCertify**
Quick geotechnical overview with essential soil data and basic risk indicators.
https://buy.stripe.com/fZu00j44C0Jp4Nc3syaMU0f
---

## 🌾 What It Does

Transform Node-RED into an agricultural intelligence platform for IoT and edge automation:

- **Soil Analysis** — USDA soil composition, nutrient levels, health scoring
- **Water Quality Monitoring** — EPA water data, contamination risk assessment
- **Crop Recommendations** — Location-specific planting advice, yield optimization
- **Carbon Credit Calculations** — Emissions tracking, sustainability reporting
- **Weather Data Fusion** — NOAA climate insights, forecast integration
- **Satellite Vegetation** — NDVI, water-stress overlays from NASA MODIS
- **Offline-First** — Works in remote/deep canopy areas with GPS-denied capabilities

## 🚀 Quick Start

### Install

**Node-RED Palette Manager (recommended):**
1. Open Node-RED → Menu → Manage Palette → Install
2. Search: `node-red-contrib-leafengines`
3. Click Install

**Or via npm:**
```bash
npm install node-red-contrib-leafengines
```

### Configure API Access

**Free tier (immediate):**
```bash
curl -H "x-free-tier: true" \
  -X POST https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/get-soil-data \
  -d '{"county_fips": "12086"}'
```

**Test key (immediate):**
```bash
curl -H "x-api-key: leaf-test-370df0a2e62e" \
  -X POST https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/get-soil-data \
  -d '{"county_fips": "12086"}'
```

**Production:** [Subscribe →](https://buy.stripe.com/5kQ6oHcB88bR93s8MSaMU04) for instant API key via Stripe checkout

## 💰 Pricing

### Free Tier — No Credit Card
- **Test key:** `leaf-test-370df0a2e62e` (works immediately with any API call)
- **Free header:** `x-free-tier: true` (no key needed at all)
- **Includes:** 3 AI calls/day + 50 data lookups/day. County lookup, water quality, TurboQuant check always free.
- **Try it:** [soilcertify.com →](https://soilcertify.com)

### Credit Packs — Pay As You Go

| Pack | Price | Credits | Per-Call Rate | Best For | Buy |
|------|-------|---------|---------------|----------|-----|
| Starter | $10.00 | 1,000 | $0.01/call | Low-volume users, hobby developers | [Buy →](https://buy.stripe.com/bJe3cvfNk77N5RgfbgaMU0e) |
| Pro | $25.00 | 5,000 | $0.005/call | Regular users, n8n/Node-RED integrations | [Buy →](https://buy.stripe.com/cNi9AT1Wu0Jp93s8MSaMU0c) |
| Enterprise | $50.00 | 25,000 | $0.002/call | High-volume users, MCP/Clawhub clients | [Buy →](https://buy.stripe.com/28EeVd9oWeAf2F48MSaMU0d) |

> One-time purchase. Credits never expire. All endpoints unlocked. Data lookups always free.

### Monthly Volume Subscriptions

| Plan | Price | What You Get | Best For | Subscribe |
|------|-------|--------------|----------|-----------|
| Starter | $149/mo | Unlimited AI calls + email support | Small teams, production n8n workflows | [Subscribe →](https://buy.stripe.com/5kQ6oHcB88bR93s8MSaMU04) |
| Pro | $499/mo | Higher throughput + priority support | Growing integrations, MCP servers | [Subscribe →](https://buy.stripe.com/14A6oH7gO3VBcfE1kqaMU05) |
| Enterprise | $1,999/mo | Unlimited volume + custom SLAs + white-label | OEM partners, enterprise deployments | [Subscribe →](https://buy.stripe.com/14A6oH7gO3VBcfE1kqaMU05) |


### International Pricing

| Region | Credit Packs | Monthly Subs | Local Payment Methods |
|--------|-------------|--------------|----------------------|
| **United States** | $10/$25/$50 | $149/$499/$1999 | Card, Apple Pay, Google Pay |
| **European Union** | €9/€22/€45 (VAT incl.) | €135/€450/€1800 (VAT incl.) | Klarna, iDEAL, EPS, Apple/Google Pay |
| **United Kingdom** | £8/£20/£40 (VAT incl.) | £115/£385/£1538 (VAT incl.) | Afterpay/Clearpay, Apple/Google Pay |
| **Australia** | AU$15/AU$37/AU$75 (GST incl.) | AU$225/AU$750/AU$2999 (GST incl.) | Afterpay, Apple/Google Pay |

## 🔧 Available Nodes

### Configuration
- **LeafEngines Config** — API key management and connection settings

### Data Nodes
- **LeafEngines Soil** — USDA soil composition by county FIPS (Free tier)
- **LeafEngines Weather** — Live weather and soil fusion data (Starter tier)
- **LeafEngines Water** — EPA water quality monitoring (Starter tier)
- **LeafEngines Crop** — AI crop recommendations and plant identification (Starter/Pro tier)
- **LeafEngines Carbon** — Carbon credit estimation (Pro tier)
- **LeafEngines Prescription** — Variable-rate prescription generation (Pro tier)

### Optimization Nodes
- **LeafEngines Batch** — Batch multiple API calls into single requests
- **LeafEngines Query** — Generic node for any LeafEngines endpoint

### Enterprise Nodes
- **LeafEngines Environmental** — Environmental impact scoring and risk assessment
- **LeafEngines Satellite** — Google Earth Engine satellite integration
- **LeafEngines AI Chat** — Advanced conversational AI
- **LeafEngines Visual** — Visual crop analysis and diagnostics

## 📖 Example Flows

### Automated Soil Health Monitoring
```
[schedule: daily 8am] → [LeafEngines Soil] → [check thresholds] → [alert if needed] → [email/sms]
```

### Irrigation Optimization
```
[weather forecast] → [LeafEngines Soil] → [LeafEngines Water] → [calculate irrigation] → [sprinkler controller]
```

### Carbon Credit Reporting
```
[field sensor data] → [LeafEngines Carbon] → [format report] → [Google Sheets] → [email report]
```

## 🎯 Use Cases

### For Agronomists & Soil Scientists
- **Automated soil monitoring** — Scheduled analysis with threshold alerting
- **Carbon credit reporting** — Emissions tracking and certification
- **Partner Program:** [Sell soil reports to your clients →](https://soilcertify.com)

### For Agricultural Consultants
- **Client-ready workflows** — Automated analysis and report generation
- **Sell reports to clients:** [Join Partner Program →](https://soilcertify.com) (4× markup on $25 wholesale)

### For IoT & Edge Engineers
- **Sensor network intelligence** — Local processing for agricultural IoT
- **Precision agriculture** — Variable-rate prescription generation
- **Farm automation** — Irrigation, pest management, yield prediction
- **Offline capability** — Works in remote/deep canopy areas

## 🔗 MCP Protocol Integration

LeafEngines implements the Model Context Protocol (MCP), enabling AI agents to discover and invoke agricultural intelligence tools natively.

**Claude Desktop Configuration:**
```json
{
  "mcpServers": {
    "leafengines": {
      "transport": "streamable-http",
      "url": "https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/mcp-server",
      "headers": { "x-api-key": "leaf-test-370df0a2e62e" }
    }
  }
}
```

## 🔗 Related Packages

- **[MCP Server](https://www.npmjs.com/package/@ancientwhispers54/leafengines-mcp-server)** — Claude Desktop, Cursor integration
- **[n8n Nodes](https://www.npmjs.com/package/n8n-nodes-leafengines)** — n8n automation
- **[QGIS Plugin](https://plugins.qgis.org/plugins/qgis_leafengines/)** — 500,000+ QGIS users (Plugin ID 4987)
- **[SoilCertify](https://soilcertify.com)** — Professional soil reports, no coding required

## 📞 Support

- **API Documentation:** [app.soilsidekickpro.com/api-docs](https://app.soilsidekickpro.com/api-docs)
- **Node-RED Community:** [reddit.com/r/nodered](https://reddit.com/r/nodered)
- **GitHub Issues:** [github.com/QWarranto/node-red-contrib-leafengines/issues](https://github.com/QWarranto/node-red-contrib-leafengines/issues)
- **Email:** support@soilsidekickpro.com
- **Partnerships:** partnerships@leafengines.com

## 📄 License

MIT License — integration code is open source. API service has commercial terms with free tier. Core algorithms are patent-protected (U.S. #19/320,727, #19/544,827).

---

🌱 **LeafEngines™** | SoilSidekick Pro® | SoilCertify | SoilTech Suite, Inc.
*Space gives the picture. We give the truth.*
