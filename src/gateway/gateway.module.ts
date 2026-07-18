import { GATEWAY_OPTIONS } from "@/tokens.js";
import { DynamicModule, Module } from "@nestjs/common";
import { GatewayOptions } from "./index.js";
import { GetUserService } from "./services/get-user-service.js";

@Module({})
export class GatewayModule {
  static register(opts: {
    global?: boolean;
    imports?: any[];
    inject?: any[];
    useFactory: (...args: any[]) => Promise<GatewayOptions> | GatewayOptions;
  }): DynamicModule {
    return {
      global: opts.global,
      module: GatewayModule,
      imports: opts.imports ?? [],
      providers: [
        {
          provide: GATEWAY_OPTIONS,
          inject: opts.inject ?? [],
          useFactory: (...args: any[]) => opts.useFactory(...args),
        },
        GetUserService,
      ],
      exports: [GetUserService, GATEWAY_OPTIONS],
    };
  }
}
