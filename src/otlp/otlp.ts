// import { logs } from '@opentelemetry/api-logs';
// import { OTLPLogExporter } from '@opentelemetry/exporter-logs-otlp-http';
// import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
// import { registerInstrumentations } from '@opentelemetry/instrumentation';
// import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
// import { resourceFromAttributes } from '@opentelemetry/resources';
// import {
//   BatchLogRecordProcessor,
//   LoggerProvider,
// } from '@opentelemetry/sdk-logs';
// import {
//   BatchSpanProcessor,
//   NodeTracerProvider,
// } from '@opentelemetry/sdk-trace-node';
// import {
//   ATTR_SERVICE_NAME,
//   ATTR_SERVICE_VERSION,
// } from '@opentelemetry/semantic-conventions';

// const resource = resourceFromAttributes({
//   [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME,
//   [ATTR_SERVICE_VERSION]: '1.0.0',
// });

// const options = {
//   concurrencyLimit: 10,
//   headers: {},
// };

// const traceExporter = new OTLPTraceExporter({
//   url: process.env.OTEL_EXPORTER_OTLP_TRACES_ENDPOINT,
//   ...options,
// });

// const logExporter = new OTLPLogExporter({
//   url: process.env.OTEL_EXPORTER_OTLP_LOGS_ENDPOINT,
//   ...options,
// });

// export const tracerProvider = new NodeTracerProvider({
//   resource,
//   spanProcessors: [new BatchSpanProcessor(traceExporter, {})],
// });

// export const loggerProvider = new LoggerProvider({
//   resource,
//   processors: [new BatchLogRecordProcessor(logExporter)],
// });

// tracerProvider.register();
// logs.setGlobalLoggerProvider(loggerProvider);

// registerInstrumentations({
//   instrumentations: [new HttpInstrumentation({})],
// });
