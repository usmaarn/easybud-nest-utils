import { GetUserCommand } from "./common/commands.js";
import { GetUserResponse } from "./common/service-response.js";

export interface TransactionManager {
  run<T>(work: () => Promise<T>): Promise<T>;
}

export interface CacheService {
  get<T = any>(key: string): Promise<T | null> | T | null;
  set<T = any>(key: string, value: T): Promise<void> | void;
  delete(key: string): Promise<void> | void;
}

export interface GetUserUseCase {
  execute(cmd: GetUserCommand): Promise<GetUserResponse | null>;
}
