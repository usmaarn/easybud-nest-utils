import { CacheService } from "@/interfaces.js";
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class RedisService
  implements OnModuleInit, OnModuleDestroy, CacheService
{
  private prefix = "easybud:";

  constructor(
    @Inject("REDIS_CLIENT")
    private readonly client: ReturnType<typeof createClient>,
  ) {}

  async onModuleInit() {
    this.client.on("error", (error) => {
      console.error("Redis client error: ", error);
    });

    await this.client.connect();
  }

  onModuleDestroy() {
    this.client.destroy();
  }

  async set<T>(key: string, value: T): Promise<void> {
    if (value && typeof value === "object" && !Array.isArray(value)) {
      await this.client.HSET(key, value as Record<string, string>);
    } else {
      await this.client.SET(key, JSON.stringify(value));
    }
  }

  async get<T>(key: string): Promise<T | null> {
    const type = await this.client.TYPE(key);

    switch (type) {
      case "hash":
        return (await this.client.HGETALL(key)) as T;

      case "string": {
        const value = await this.client.GET(key);
        return value === null ? null : (JSON.parse(value) as T);
      }

      default:
        return null;
    }
  }

  async delete(key: string): Promise<void> {
    await this.client.DEL(this.prefix + key);
  }
}
