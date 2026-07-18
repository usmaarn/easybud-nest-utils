export * from "./gateway.module.js";
export * from "./services/index.js";
export * from "./routes.js";
export * from "./user-response.dto.js";

export interface GatewayOptions {
  gatewayUrl: string;
  authUrl: string;
  paymentUrl: string;
}
