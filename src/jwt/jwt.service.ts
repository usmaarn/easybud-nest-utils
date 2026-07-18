import { JWT_SECRET } from "@/tokens.js";
import { Inject, Injectable } from "@nestjs/common";
import * as jose from "jose";

type JwtClaims = {
  sub: string;
  permissions: string[];
  roles: string[];
};

@Injectable()
export class JwtService {
  constructor(
    @Inject(JWT_SECRET)
    private readonly secret: string,
  ) {}

  async validateToken(tokenString: string): Promise<JwtClaims> {
    const key = await jose.importSPKI(this.secret, "RS256");
    // const key = new TextEncoder().encode(this.secret);
    const claims = await jose.jwtVerify(tokenString, key, {});
    console.log(claims);
    return {
      sub: "",
      permissions: [],
      roles: [],
    };
  }
}
