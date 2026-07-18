import { DynamicModule, Module } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "./repository.js";
import { TransactionContext } from "./transaction.js";

interface ModuleOptions {
  isGlobal: boolean;
  database: {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  };
}

@Module({})
export class PGModule {
  static forRoot(options: ModuleOptions): DynamicModule {
    return {
      module: PGModule,
      providers: [
        {
          provide: PG_POOL,
          useFactory: () =>
            new Pool({
              ...options.database,
            }),
        },
        TransactionContext,
      ],
      exports: [PG_POOL, TransactionContext],
    };
  }
}
