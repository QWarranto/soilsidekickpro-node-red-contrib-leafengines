# node-red-contrib-leafengines — Agricultural Intelligence for Node-RED

**Soil analysis, crop recommendations, and environmental intelligence** for Node-RED IoT/edge automation. Patent-protected algorithms. Works with free test key — no signup required.

## ⚡ Get Started Now

**Free tier — no signup, no credit card:**
- **Test key:** `leaf-test-370df0a2e62e` (works immediately with any API call)
- **Free header:** `x-free-tier: true` (no key needed at all)

**Ready for production? Founder pricing ends June 1, 2026:**
- [Starter — $10/mo → lifetime $49/mo lock →](https://buy.stripe.com/14A7sL30y8bR2F4fbgaMU02)
- [Pro — $49/mo → lifetime $149/mo lock →](https://buy.stripe.com/cNi3cv1WuajZcfE7IOaMU03)

**Get a professional soil report (no coding required):** [soilcertify.com →](https://soilcertify.com)

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

**Production:** [Subscribe →](https://buy.stripe.com/14A7sL30y8bR2F4fbgaMU02) for instant API key via Stripe checkout

## 💰 Pricing

### Free Tier — No Credit Card
- **Test key:** `leaf-test-370df0a2e62e`
- **Free header:** `x-free-tier: true`
- **Includes:** Basic soil analysis, county lookup, TurboQuant check
- **Try it:** [soilcertify.com →](https://soilcertify.com)

### Pay-As-You-Go

| Tier | Price | Per-Call Rate | What You Get | Buy |
|------|-------|--------------|--------------|-----|
| Commoditized | $0.50/bundle | $0.001/call | Basic soil/weather, county lookup | [Buy →](https://buy.stripe.com/3cIdR99oWajZdjI6EKaMU07) |
| Enhanced | $1.50/bundle | $0.003/call | Environmental impact, crop suitability, water quality | [Buy →](https://buy.stripe.com/7sY28reJg1NtenM8MSaMU0b) |
| Proprietary | $5.00/bundle | $0.010/call | Planting optimization, carbon credits, VRT | [Buy →](https://buy.stripe.com/3cIeVd9oW1NtgvU1kqaMU09) |
| Exclusive | $10.00/bundle | $0.020/call | Patent-pending environmental compatibility scoring | [Buy →](https://buy.stripe.com/6oU4gzbx40Jp6Vk1kqaMU0a) |

### Monthly Subscriptions

| Plan | Price | Included Calls | Best For | Subscribe |
|------|-------|---------------|----------|-----------|
| **Founder Starter** | $10/mo → lifetime $49/mo | 10,000/mo | Solo developers, prototyping | [Subscribe →](https://buy.stripe.com/14A7sL30y8bR2F4fbgaMU02) |
| **Founder Pro** | $49/mo → lifetime $149/mo | 35,000/mo | Production apps, teams | [Subscribe →](https://buy.stripe.com/cNi3cv1WuajZcfE7IOaMU03) |
| Starter | $149/mo | 10,000/mo | Solo developers | [Subscribe →](https://buy.stripe.com/5kQ6oHcB88bR93s8MSaMU04) |
| Pro | $499/mo | 35,000/mo | Production apps, teams | [Subscribe →](https://buy.stripe.com/14A6oH7gO3VBcfE1kqaMU05) |
| Enterprise | $1,999/mo | 175,000+/mo | White-label, SLA, OEM | [Subscribe →](https://buy.stripe.com/eVqaEXfNkajZ6Vk0gmaMU06) |
| Enterprise Bundle | $3,499/mo | 685,000/mo | Large OEM, max volume | Contact: sales@leafengines.com |

> ⏰ **Founder pricing expires June 1, 2026.** First 100 customers lock lifetime rates.

### International Pricing

| Region | Starter | Pro | Local Payment Methods |
|--------|---------|-----|----------------------|
| **United States** | $49/mo | $149/mo | Card, Apple Pay, Google Pay |
| **European Union** | €45/mo (VAT incl.) | €135/mo (VAT incl.) | Klarna, iDEAL, EPS, Apple/Google Pay |
| **United Kingdom** | £38/mo (VAT incl.) | £115/mo (VAT incl.) | Afterpay/Clearpay, Apple/Google Pay |
| **Australia** | AU$75/mo (GST incl.) | AU$225/mo (GST incl.) | Afterpay, Apple/Google Pay |

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
- **Get professional reports without coding:** [soilcertify.com →](https://soilcertify.com)

### For Agricultural Consultants
- **Client-ready workflows** — Automated analysis and report generation
- **Sell reports to clients:** [soilcertify.com →](https://soilcertify.com) (172%+ profit margin at $29/mo)

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
