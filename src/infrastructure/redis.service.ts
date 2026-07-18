import { ConfigService } from '@/old/config/config.service';
import { config } from '@/old/config/configuration';
import { Injectable, Logger } from '@nestjs/common';

import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private logger = new Logger(RedisService.name);
  public client: Redis;

  constructor(config: ConfigService) {
    try {
      const host = config.getOrThrow<string>('redis.host');
      const port = config.getOrThrow<number>('redis.port');
      const username = config.get<string>('redis.user');
      const password = config.get<string>('redis.password');

      let db = config.get<number>('redis.db');

      if (!db || !Number.isInteger(db)) {
        db = 0;
      }

      this.client = new Redis({
        host,
        port,
        db,
        ...(username && {
          username,
          password,
        }),
      });

      this.client.on('connect', () => {
        this.logger.log('Redis connected');
      });

      this.client.on('error', (error) => {
        this.logger.error(error);
      });
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }

  async get<T = any>(key: string): Promise<T | null> {
    try {
      const redisKey = `${config.app.name}:${key}`;
      const value = await this.client.get(redisKey);

      if (!value) {
        this.logger.warn(`Redis key "${redisKey} not found"`);
        return null;
      }

      return JSON.parse(value) as T;
    } catch (error: any) {
      this.logger.error(error);
      return null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    try {
      const redisKey = `${config.app.name}:${key}`;
      const payload = JSON.stringify(value);
      await this.client.set(redisKey, payload);
    } catch (error: any) {
      this.logger.error(error);
    }
  }

  async delete(key: string): Promise<void> {
    try {
      const redisKey = `${config.app.name}:${key}`;
      await this.client.del(redisKey);
    } catch (error: any) {
      this.logger.error(error);
      throw error;
    }
  }
}
