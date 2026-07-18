import { JWT_SECRET } from "@/tokens.js";
import { DynamicModule, Module } from "@nestjs/common";
import { JwtService } from "./jwt.service.js";

@Module({})
export class JwtModule {
  static async register(opt: {
    global?: boolean;
    imports?: any[];
    inject?: any[];
    useFactory(...args: any[]): Promise<string> | string;
  }): Promise<DynamicModule> {
    return {
      global: opt.global,
      module: JwtModule,
      imports: opt.imports ?? [],
      providers: [
        {
          provide: JWT_SECRET,
          inject: opt.inject ?? [],
          async useFactory(...args) {
            return opt.useFactory(...args);
          },
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
