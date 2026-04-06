# Screenshots for Node-RED Flow Library Submission

## Required Screenshots

### 1. Node Palette View (palette-view.png)
**What to show:**
- All LeafEngines nodes in the palette (under "leafengines" category)
- Configuration node + 8 specialized nodes
- Clear visibility of node names and icons

**Caption:** "LeafEngines nodes in Node-RED palette - 8 specialized agricultural intelligence nodes"

### 2. Example Flow - Soil Health Monitor (example-flow.png)
**What to show:**
- Complete `soil-health-monitor.json` flow deployed
- Nodes connected and configured
- Debug panel showing soil analysis results
- Status indicators (blue/green dots)

**Caption:** "Automated soil health monitoring flow with daily analysis and email alerts"

### 3. Configuration UI (config-ui.png)
**What to show:**
- LeafEngines Config node edit dialog
- API key field (masked)
- Tier selection dropdown
- URL configuration
- Help text and validation

**Caption:** "Simple API key configuration with tier-based rate limit awareness"

### 4. Output Example (output-example.png)
**What to show:**
- Debug panel with expanded soil analysis data
- JSON structure with soil parameters
- Cache information display
- Confidence intervals

**Caption:** "Detailed soil analysis output with cache info and confidence intervals"

## How to Create Screenshots

### Option A: Using Node-RED (Recommended)
1. Install the package locally:
```bash
cd ~/.node-red
npm install /path/to/node-red-contrib-leafengines
```

2. Start Node-RED:
```bash
node-red
```

3. Open http://localhost:1880
4. Create the flows and take screenshots

### Option B: Mockup Creation
If you don't have Node-RED running, create mockups showing:
1. **Palette mockup**: List of nodes with agriculture-themed icons
2. **Flow mockup**: Visual workflow with agricultural context
3. **UI mockup**: Clean configuration dialog
4. **Data mockup**: Structured agricultural data output

## Flow Library Submission Text

### Title
"LeafEngines - Agricultural Intelligence API for Node-RED"

### Description
```
LeafEngines brings agricultural intelligence to Node-RED's low-code automation platform. 
With 8 specialized nodes for soil analysis, weather forecasting, crop recommendations, 
water quality monitoring, carbon credit calculation, and variable-rate prescription 
generation, LeafEngines enables farmers, agronomists, and agricultural engineers to 
build automation workflows without coding.

Key Features:
• USDA soil composition by county FIPS
• EPA water quality monitoring
• AI crop recommendations and planting calendars
• Carbon credit estimation with practice change analysis
• Variable-rate prescription generation (GeoJSON/Shapefile)
• Batch optimization - 5 API calls = 1 rate-limited request
• MCP protocol support for AI agent integration (Claude Desktop/OpenClaw)
• Tier-based access (Free, Starter, Pro, Enterprise)

Perfect for:
• Automated soil health monitoring
• Smart irrigation scheduling
• Carbon credit reporting automation
• Precision agriculture equipment integration
• Agricultural research data collection
• Farm management dashboard creation

Get your free API key at: soilsidekickpro.com/podcast
```

### Tags
agriculture, soil, weather, crop, farming, iot, automation, mcp, api, carbon-credits, water-quality, precision-agriculture

### Installation Command
```bash
npm install node-red-contrib-leafengines
```

### Links
- **npm**: https://www.npmjs.com/package/node-red-contrib-leafengines
- **GitHub**: https://github.com/soilsidekickpro/node-red-contrib-leafengines
- **Documentation**: https://soilsidekickpro.com/api-docs
- **API Keys**: https://soilsidekickpro.com/podcast

## Promotion Strategy

### 1. Flow Library Features
- Submit during "New & Updated" window (Mondays)
- Use "agriculture" tag for featured category placement
- Include all 3 example flows as downloadable examples

### 2. Community Engagement
- Post in Node-RED Forum: https://discourse.nodered.org/
- Share on r/NodeRED subreddit
- Tweet with #NodeRED #Agriculture #IoT hashtags
- LinkedIn post targeting agricultural technology groups

### 3. Cross-Promotion
- Link from LeafEngines documentation
- Mention in API documentation as "Node-RED integration available"
- Include in email newsletter to existing users
- Feature in "Integration Spotlight" blog post

## Quality Checklist Before Submission

### Required
- [ ] Package published to npm
- [ ] GitHub repository public
- [ ] README.md complete with installation instructions
- [ ] Example flows work without modification
- [ ] Screenshots show actual usage (not just mockups)
- [ ] All nodes have help text and proper configuration

### Recommended
- [ ] Video demo (YouTube) showing 5-minute setup
- [ ] Tutorial blog post "Getting Started with LeafEngines in Node-RED"
- [ ] Testimonials from early users (if available)
- [ ] Integration examples with other popular nodes (dashboard, email, etc.)

### Advanced
- [ ] Custom node icons (beyond default)
- [ ] Internationalization support
- [ ] Accessibility features (screen reader compatible)
- [ ] Performance benchmarks (response times under load)