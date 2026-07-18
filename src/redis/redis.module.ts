import { DynamicModule, Module } from "@nestjs/common";
import { createClient } from "redis";
import { RedisService } from "./redis.service.js";
import { CACHE_SERVICE } from "@/tokens.js";

type ClientOptions = {
  host: string;
  port: number;
  username: string | undefined;
  database: number | undefined;
  password: string;
};

@Module({})
export class RedisModule {
  static register(opts: {
    global?: boolean;
    imports?: any[];
    inject?: any[];
    useFactory: (...args: any[]) => Promise<ClientOptions> | ClientOptions;
  }): Promise<DynamicModule> | DynamicModule {
    return {
      global: opts.global,
      module: RedisModule,
      imports: opts.imports ?? [],
      providers: [
        {
          provide: "REDIS_CLIENT",
          inject: opts.inject ?? [],
          async useFactory(...args: any[]) {
            const options = await opts.useFactory(...args);
            return createClient({
              url: `redis://${options.host}:${options.port}`,
              username: options.username,
              password: options.password,
              database: options.database,
            });
          },
        },
        RedisService,
        {
          provide: CACHE_SERVICE,
          useExisting: RedisService,
        },
      ],
      exports: [RedisService, CACHE_SERVICE],
    };
  }
}
