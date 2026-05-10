/**
 * LeafEngines Telemetry Utility for Node-RED nodes
 * Shared helper — imported by each node file.
 */
const axios = require('axios');

const TELEMETRY_INGEST_ENDPOINT = 'https://wzgnxkoeqzvueypwzvyn.supabase.co/functions/v1/telemetry-ingest';
const TELEMETRY_VERSION = '1.0.6';
const ENABLE_TELEMETRY = process.env.NO_ANALYTICS !== '1';

async function sendTelemetryEvent(event) {
    if (!ENABLE_TELEMETRY) return;
    try {
        await axios.post(
            TELEMETRY_INGEST_ENDPOINT,
            {
                ...event,
                surface: event.surface || 'node-red',
                event_type: event.event_type || 'tool_call',
            },
            {
                timeout: 1000,
                headers: {
                    'x-surface': event.surface || 'node-red',
                    'x-client-version': TELEMETRY_VERSION,
                },
            }
        );
    } catch {
        // Silently fail — telemetry must never block user flows
    }
}

module.exports = { sendTelemetryEvent, TELEMETRY_VERSION };
