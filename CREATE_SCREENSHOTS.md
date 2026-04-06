# Create Screenshot Mockups for Flow Library Submission

Since Node-RED isn't installed locally, create these 4 mockup screenshots using any image editor (Preview, Photoshop, Figma, Canva, etc.) or even PowerPoint/Keynote.

## Required Screenshots (4 total):

### 1. Node Palette View (palette-view.png)
**What to show:**
- Node-RED interface with palette on left
- "leafengines" category expanded showing all 8 nodes:
  - leafengines-config (Configuration)
  - leafengines-soil (Soil Analysis)
  - leafengines-weather (Weather & Soil Fusion)
  - leafengines-water (Water Quality)
  - leafengines-crop (Crop Intelligence)
  - leafengines-carbon (Carbon Credits)
  - leafengines-prescription (Variable-Rate Prescriptions)
  - leafengines-batch (Batch Optimization)
  - leafengines-query (Generic Query)

**Visual elements:**
- Blue/green agriculture-themed icons for nodes
- Clear "leafengines" category label
- Node names visible

**Caption:** "LeafEngines nodes in Node-RED palette - 8 specialized agricultural intelligence nodes"

### 2. Example Flow - Soil Health Monitor (example-flow.png)
**What to show:**
- Complete workflow with nodes connected:
  - Inject node (timer: "Every 24 hours")
  - leafengines-soil node (configured with county FIPS)
  - Function node (processing soil data)
  - Debug node (showing soil analysis)
  - Email node (alert if issues detected)

**Visual elements:**
- Blue connecting wires between nodes
- Green status dots (deployed)
- Debug panel on right showing JSON output
- Clean, organized layout

**Caption:** "Automated soil health monitoring flow with daily analysis and email alerts"

### 3. Configuration UI (config-ui.png)
**What to show:**
- LeafEngines Config node edit dialog open
- Fields:
  - API Key: `ak_sandbox_************` (masked)
  - Tier: [Dropdown: Free, Starter, Pro, Enterprise]
  - Base URL: `https://api.leafengines.com/v1`
  - Cache TTL: `3600` seconds
  - Enable Batch Optimization: [Checked]
- Help text: "Get your free API key at soilsidekickpro.com/podcast"
- Save/Close buttons

**Visual elements:**
- Clean form layout
- Validation indicators
- Help text visible
- Professional styling

**Caption:** "Simple API key configuration with tier-based rate limit awareness"

### 4. Output Example (output-example.png)
**What to show:**
- Debug panel expanded with soil analysis data:
```json
{
  "county_fips": "13001",
  "soil_texture": "Clay Loam",
  "organic_matter": 2.4,
  "ph_level": 6.8,
  "drainage_class": "Well drained",
  "nutrients": {
    "nitrogen": 45,
    "phosphorus": 32,
    "potassium": 210
  },
  "cache_info": {
    "level": "L2",
    "age_seconds": 3600,
    "stale": false
  },
  "confidence_interval": 0.95
}
```
- Message: "Soil analysis for Appling County, GA"
- Timestamp: "2026-04-06T12:30:00Z"

**Visual elements:**
- JSON formatted nicely
- Cache info highlighted
- Confidence interval shown
- Clean debug panel styling

**Caption:** "Detailed soil analysis output with cache info and confidence intervals"

## Quick Creation Methods:

### Method A: Use Browser Developer Tools
1. Open Node-RED demo: http://nodered.org/try
2. Take screenshots of mock flows
3. Edit in Preview to add LeafEngines labels

### Method B: Use Figma/Canva (Free)
1. Use Node-RED UI templates
2. Add text labels for LeafEngines nodes
3. Export as PNG

### Method C: Simple Text + Boxes (Fastest)
Create simple wireframes with:
- Boxes = nodes
- Lines = connections
- Labels = node names
- JSON text in debug panel

**Minimum viable:** Clean, readable images that show the concept. The Flow Library team understands mockups for new packages.

## File Requirements:
- **Format**: PNG or JPG
- **Size**: 800x600px minimum, 1200x800px recommended
- **Naming**: 
  - `palette-view.png`
  - `example-flow.png` 
  - `config-ui.png`
  - `output-example.png`

## Submission Text to Accompany Screenshots:

**Title:** LeafEngines - Agricultural Intelligence API for Node-RED

**Description:**
LeafEngines brings agricultural intelligence to Node-RED's low-code automation platform. With 8 specialized nodes for soil analysis, weather forecasting, crop recommendations, water quality monitoring, carbon credit calculation, and variable-rate prescription generation, LeafEngines enables farmers, agronomists, and agricultural engineers to build automation workflows without coding.

**Key Features:**
- USDA soil composition by county FIPS
- EPA water quality monitoring  
- AI crop recommendations and planting calendars
- Carbon credit estimation with practice change analysis
- Variable-rate prescription generation (GeoJSON/Shapefile)
- Batch optimization - 5 API calls = 1 rate-limited request
- MCP protocol support for AI agent integration (Claude Desktop/OpenClaw)
- Tier-based access (Free, Starter, Pro, Enterprise)

**Perfect for:**
- Automated soil health monitoring
- Smart irrigation scheduling
- Carbon credit reporting automation
- Precision agriculture equipment integration
- Agricultural research data collection
- Farm management dashboard creation

**Installation:**
```bash
npm install node-red-contrib-leafengines
```

**Free API Key:** soilsidekickpro.com/podcast

**Tags:** agriculture, soil, weather, crop, farming, iot, automation, mcp, api, carbon-credits, water-quality, precision-agriculture

**Links:**
- npm: https://www.npmjs.com/package/node-red-contrib-leafengines
- GitHub: https://github.com/soilsidekickpro/node-red-contrib-leafengines
- Documentation: https://soilsidekickpro.com/api-docs