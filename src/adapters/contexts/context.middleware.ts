import { Injectable, NestMiddleware } from '@nestjs/common';
import { RequestContext } from './request-user';
import { Request, Response } from 'express';

@Injectable()
export class ContextMiddleware implements NestMiddleware {
  constructor(private readonly context: RequestContext) {}

  use(req: Request, res: Response, next: (error?: any) => void) {
    const store = { user: req.user, requestId: crypto.randomUUID() };
    this.context.run(store, next);
  }
}
