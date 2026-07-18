import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from "@nestjs/common";
import { type Request, type Response } from "express";
import { JwtService } from "./jwt.service.js";

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: (error?: any) => void) {
    console.log("JWT Middleware...");
    const authToken = req.headers.authorization;
    if (!authToken) {
      throw new UnauthorizedException("auth header not present");
    }
    const tokenString = authToken.substring(7).trim();

    if (!tokenString || tokenString == "") {
      throw new UnauthorizedException("invalid token");
    }

    const claims = await this.jwtService.validateToken(tokenString);

    console.log(claims);

    req.user = {
      id: claims.sub,
      roles: claims.roles,
      permissions: claims.permissions,
    };

    next();
  }
}
