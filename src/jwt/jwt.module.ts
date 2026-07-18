import { DynamicModule, Module } from "@nestjs/common";
import { JwtService } from "./jwt.service.js";

@Module({})
export class JwtModule {
  static forRoot(opt: { isGlobal: boolean }): DynamicModule {
    return {
      module: JwtModule,
      providers: [JwtService],
      exports: [JwtService],
      global: opt.isGlobal,
    };
  }
}
