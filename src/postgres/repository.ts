import { Inject, Injectable } from "@nestjs/common";
import { Pool, PoolClient } from "pg";
import { TransactionContext } from "./transaction";

export const PG_POOL = Symbol("PG_POOL");

@Injectable()
export abstract class PGRepository {
  constructor(
    @Inject(PG_POOL)
    protected readonly pool: Pool,
    protected readonly context: TransactionContext,
  ) {}

  protected get db(): Pool | PoolClient {
    return this.context.client ?? this.pool;
  }
}
