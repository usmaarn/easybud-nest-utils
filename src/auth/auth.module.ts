import { AUTH_SERVICE_URL } from "@/tokens.js";
import { DynamicModule, Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GetUserService } from "./get-user.service.js";
import { GetJwtSecretService } from "./get-jwt-key.service.js";

@Module({})
export class AuthModule {
  static register(opts: {
    global?: boolean;
    imports?: any[];
    inject?: any[];
    useFactory?: (...args: any[]) => Promise<string> | string;
  }): DynamicModule {
    return {
      global: opts.global,
      module: AuthModule,
      imports: opts.imports ?? [ConfigModule],
      providers: [
        {
          provide: AUTH_SERVICE_URL,
          inject: opts.inject ?? [ConfigService],
          useFactory: async (config: ConfigService, ...args: any[]) => {
            return (
              opts.useFactory?.(...args) ?? config.getOrThrow(AUTH_SERVICE_URL)
            );
          },
        },
        GetJwtSecretService,
        GetUserService,
      ],
      exports: [AUTH_SERVICE_URL, GetJwtSecretService, GetUserService],
    };
  }
}
