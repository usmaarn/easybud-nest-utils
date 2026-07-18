import { TransactionManager } from '@/shared/application/ports/transaction';
import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';
import { Pool, PoolClient } from 'pg';

@Injectable()
export class TransactionContext {
  private readonly storage = new AsyncLocalStorage<PoolClient>();

  get client(): PoolClient | undefined {
    return this.storage.getStore();
  }

  run<T>(client: PoolClient, fn: () => Promise<T>): Promise<T> {
    return this.storage.run(client, fn);
  }
}

@Injectable()
export class PGTransactionManager implements TransactionManager {
  constructor(
    private readonly pool: Pool,
    private readonly context: TransactionContext,
  ) {}

  async run<T = any>(work: () => Promise<T>): Promise<T> {
    const client = await this.pool.connect();

    try {
      await client.query('BEGIN');

      return await this.context.run(client, async () => {
        const result = await work();
        await client.query('COMMIT');
        return result;
      });
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}
