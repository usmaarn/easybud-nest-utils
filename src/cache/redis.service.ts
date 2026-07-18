import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private readonly client: ReturnType<typeof createClient>;
  private prefix = "easybud:";

  public readonly keys = {
    user: (id: string) => this.prefix + "user:" + id,
    jwtSecret: this.prefix + "jwt-key",
  };

  constructor(config: ConfigService) {
    const host = config.getOrThrow("REDIS_HOST");
    const port = config.getOrThrow("REDIS_PORT");

    this.client = createClient({
      url: `redis://${host}:${port}`,
      username: config.get("REDIS_USER"),
      database: config.get("REDIS_DB"),
      password: config.get("REDIS_PASSWORD"),
    });
  }

  async onModuleInit() {
    this.client.on("error", (error) => {
      console.error("Redis client error: ", error);
    });

    await this.client.connect();
  }

  async onModuleDestroy() {
    await this.client.quit();
  }

  async hset<T = Record<string, any>>(key: string, value: T): Promise<void> {
    await this.client.hSet(key, value as any);
  }

  async hget<T = any>(key: string): Promise<T | null> {
    const value = await this.client.hGetAll(key);
    if (!value) return null;
    return value as T;
  }
}
