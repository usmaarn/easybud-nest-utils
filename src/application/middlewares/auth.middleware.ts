import {
  Injectable,
  Logger,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService, TokenExpiredError } from '@nestjs/jwt';
import { trace } from '@opentelemetry/api';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  private readonly logger = new Logger(AuthMiddleware.name);
  private readonly tracer = trace.getTracer('authentication', '1.0');

  constructor(private readonly jwtService: JwtService) {}
  async use(req: Request, _res: Response, next: NextFunction) {
    const span = this.tracer.startSpan('auth.middleware');
    try {
      const [type, tokenString] = req.headers?.authorization?.split(' ') || [];
      if (!type || type.toLowerCase() != 'bearer' || !tokenString) {
        span.addEvent('invalid auth type', {
          'auth.type': type,
          'auth.token': tokenString,
        });
        throw new UnauthorizedException();
      }

      const payload = await this.jwtService.verifyAsync(tokenString);
      span.addEvent('verified jwt token', {
        token: tokenString,
        payload: payload,
      });

      // const user = await this.gatewayClient.getUserProfile(
      //   payload.sub,
      //   tokenString,
      // );

      // span.addEvent('fetched user details', {
      //   userId: payload.sub,
      //   result: user ? JSON.stringify(user) : 'user not found',
      // });

      // if (user && !user.id) {
      //   await this.redis.delete('users:' + payload.sub);
      // }

      // if (!user) {
      //   throw new UnauthorizedException('User not found');
      // }

      // // this.session.set("user", user);
      // session.set('accessToken', tokenString);
      // session.set('user', {
      //   ...user,
      //   permissions: payload.permissions,
      //   roles: payload.roles,
      // });

      // span.addEvent('set session', {
      //   accessToken: tokenString,
      //   user: JSON.stringify(user),
      // });

      next();
    } catch (error: any) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token expired');
      }
      span.recordException(error, new Date());
      this.logger.error(error);
      throw new UnauthorizedException(error.message);
    } finally {
      span.end();
    }
  }
}
