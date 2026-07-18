import { Injectable } from '@nestjs/common';

type JwtClaims = {
  sub: string;
  permissions: string[];
  roles: string[];
};

@Injectable()
export class JwtService {
  async validateToken(tokenString: string): Promise<JwtClaims> {
    console.log('validating tokens...');
    return {
      sub: '',
      permissions: [],
      roles: [],
    };
  }
}
