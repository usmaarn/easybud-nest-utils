import { DynamicModule, Module } from '@nestjs/common';
import { JwtService } from './jwt.service';

@Module({
  providers: [JwtService],
  exports: [JwtService],
})
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
