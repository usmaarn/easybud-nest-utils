import { DynamicModule, Module } from "@nestjs/common";
import { JwtService } from "./jwt.service.js";
import { JWT_SECRET } from "@/tokens.js";

@Module({})
export class JwtModule {
  static async register(opt: {
    global: boolean;
    imports: any[];
    inject: any[];
    useFactory(...args: any[]): Promise<string> | string;
  }): Promise<DynamicModule> {
    return {
      global: opt.global,
      module: JwtModule,
      imports: opt.imports,
      providers: [
        {
          provide: JWT_SECRET,
          useFactory(...args: any[]) {
            return opt.useFactory(args);
          },
        },
        JwtService,
      ],
      exports: [JwtService],
    };
  }
}
