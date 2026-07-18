import { Injectable, UnauthorizedException } from "@nestjs/common";
import { type Request } from "express";
import { AsyncLocalStorage } from "node:async_hooks";

type Context = {
  requestId: string;
  token: string;
  user: Request["user"];
};

@Injectable()
export class RequestContext {
  private readonly context = new AsyncLocalStorage<Context>();

  run(store: Context, callback: () => unknown) {
    return this.context.run(store, callback);
  }

  get user(): Context["user"] {
    const store = this.context.getStore();
    if (!store || !store.user) {
      throw new UnauthorizedException("unauthenticated");
    }

    return store.user;
  }

  get token(): string {
    return "";
  }
}
