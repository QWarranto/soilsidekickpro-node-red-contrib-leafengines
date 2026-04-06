# Changelog

All notable changes to the `node-red-contrib-leafengines` package will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-04-06

### Added
- Initial release of LeafEngines Node-RED integration package
- **8 specialized nodes** for agricultural intelligence:
  - `leafengines-config` - API key management and configuration
  - `leafengines-soil` - USDA soil composition analysis (Free tier)
  - `leafengines-weather` - Live weather and soil fusion data (Starter tier)
  - `leafengines-water` - EPA water quality monitoring (Starter tier)
  - `leafengines-crop` - AI crop recommendations and planting calendars (Starter/Pro tier)
  - `leafengines-carbon` - Carbon credit estimation (Pro tier)
  - `leafengines-prescription` - Variable-rate prescription generation (Pro tier)
  - `leafengines-batch` - JSON-RPC batch optimization (5x rate limit improvement)
  - `leafengines-query` - Generic endpoint caller for all 20+ endpoints

### Features
- **MCP Protocol Support** - Full Model Context Protocol implementation for AI agent integration
- **Batch Optimization** - 5 API calls = 1 rate-limited request (White Paper Section 4.3)
- **Tier-Based Access Control** - Free/Starter/Pro/Enterprise rate limit enforcement
- **Data Integrity Guarantees** - Cache awareness, confidence intervals, audit trails
- **Comprehensive Error Handling** - Network failure recovery, retry logic, graceful degradation

### Example Flows
- `soil-health-monitor.json` - Daily automated soil analysis with alerts
- `mcp-integration.json` - Complete MCP server for Claude Desktop/OpenClaw
- `batch-optimization.json` - Demonstrates 75% rate limit reduction

### Documentation
- Complete README with installation and usage instructions
- CONTRIBUTING.md with LeafEngines Contributor Program details
- API documentation aligned with LeafEngines white paper
- Test suite with mock API responses

### Technical
- Built with Node-RED 4.x compatibility
- Uses official MCP SDK 1.29.0
- Comprehensive test coverage
- Security vulnerability fixes applied
- MIT licensed

## Upcoming Features

### Planned for 1.1.0
- Remaining 12 endpoint implementations for full 20-endpoint coverage
- Enhanced visualization dashboard nodes
- Export capabilities (CSV, PDF, Excel)
- Mobile-optimized UI components

### Planned for 1.2.0
- Edge inference integration (Gemma 4 local model)
- Real-time WebSocket/MQTT streaming
- Advanced machine learning prediction nodes
- Multi-language internationalization

## Breaking Changes
- None in initial release

## Security
- All dependencies updated to address security vulnerabilities
- API key storage with Node-RED credential system
- Rate limiting and request validation
- Input sanitization and error handling