# LeafEngines Node-RED: Production Use Cases & Examples

## 🎯 Overview
This directory contains production-ready Node-RED flows and examples for LeafEngines Agricultural Intelligence integration. Perfect for agricultural IoT, farm automation, and precision agriculture applications.

## 📁 Directory Structure

### `/production-use-cases/`
Complete production flows for common agricultural scenarios:

1. **Soil Analysis & Monitoring**
   - Real-time soil sensor integration
   - USDA soil data correlation
   - Automated soil health reporting

2. **Crop Recommendation Systems**
   - Multi-factor crop suitability analysis
   - Seasonal planting recommendations
   - Yield optimization workflows

3. **Precision Irrigation**
   - Weather-based irrigation scheduling
   - Soil moisture optimization
   - Water conservation automation

4. **Carbon Credit Calculation**
   - Farm practice emissions tracking
   - Carbon sequestration calculation
   - Certification workflow automation

5. **Water Quality Compliance**
   - EPA water quality standards monitoring
   - Compliance reporting automation
   - Alert systems for violations

6. **Weather Integration**
   - Multi-source weather data aggregation
   - Frost/storm early warning systems
   - Microclimate monitoring

7. **Batch Processing**
   - Large-scale farm data processing
   - Historical analysis workflows
   - Report generation automation

8. **Prescription Mapping**
   - Variable rate application maps
   - Equipment integration workflows
   - Precision input optimization

### `/quick-start/`
Simple flows to get started quickly:

- **basic-test.js** - Quick connectivity test
- **config-example.js** - Configuration management
- **query-patterns.js** - Common data query patterns

## 🚀 Getting Started

### 1. Install LeafEngines Node-RED Package
```bash
npm install node-red-contrib-leafengines
```

### 2. Import Example Flows
1. Open Node-RED editor
2. Click menu → Import → Clipboard
3. Paste the flow JSON from example files
4. Configure your LeafEngines API key

### 3. Configure Your Environment
Copy `config-example.js` to `config.js` and update:
- API endpoints
- Farm location data
- Sensor configurations
- Alert preferences

## 🔧 Production Deployment Tips

### Security Best Practices
- Store API keys in environment variables
- Use Node-RED's credential management
- Implement rate limiting for API calls
- Set up monitoring and alerting

### Performance Optimization
- Use batch processing for large datasets
- Implement caching for frequent queries
- Schedule heavy operations during off-peak hours
- Monitor flow execution times

### Integration Patterns
- **MQTT** for IoT sensor integration
- **HTTP/REST** for external API calls
- **Database nodes** for data persistence
- **Dashboard nodes** for visualization

## 📊 Monitoring & Maintenance

### Key Metrics to Track
- API response times
- Error rates by flow component
- Data processing volumes
- Alert frequency and types

### Common Issues & Solutions
See `TROUBLESHOOTING.md` for common problems and solutions.

## 🤝 Community & Support

- **GitHub Issues**: [Report bugs or request features](https://github.com/QWarranto/node-red-contrib-leafengines/issues)
- **Documentation**: [Complete API reference](https://docs.leafengines.com/node-red)
- **Community Forum**: [Share flows and get help](https://community.nodered.org)

## 📄 License
These examples are provided under the same license as the main LeafEngines Node-RED package. See `LICENSE` file for details.

---

**Next Steps:**
1. Start with `basic-test.js` to verify connectivity
2. Explore production use cases that match your needs
3. Customize flows for your specific farm/operation
4. Join the community to share your implementations!