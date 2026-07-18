import { DynamicModule, Module } from "@nestjs/common";
import { Pool } from "pg";
import { PG_POOL } from "./repository.js";
import { TransactionContext } from "./transaction.js";

type DatabaseOptions = {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
};

type ModuleOptions = {
  global?: boolean;
  imports?: any[];
  inject?: any[];
  useFactory: (...args: any[]) => Promise<DatabaseOptions> | DatabaseOptions;
};

@Module({})
export class PGModule {
  static register(options: ModuleOptions): DynamicModule {
    return {
      global: options.global,
      module: PGModule,
      imports: options.imports ?? [],
      providers: [
        {
          provide: PG_POOL,
          inject: options.inject ?? [],
          useFactory: async (...args: any[]) => {
            const database = await options.useFactory(...args);
            return new Pool({ ...database });
          },
        },
        TransactionContext,
      ],
      exports: [PG_POOL, TransactionContext],
    };
  }
}
