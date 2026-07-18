import { Injectable, NestMiddleware } from "@nestjs/common";
import { RequestContext } from "./request.context";
import { Request, Response } from "express";

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContext) {}

  use(req: Request, res: Response, next: (error?: any) => void) {
    let token = "";

    const auth = req.headers.authorization;
    if (auth) {
      token = auth.substring(7);
    }

    const store = { user: req.user, token, requestId: crypto.randomUUID() };
    this.context.run(store, next);
  }
}
