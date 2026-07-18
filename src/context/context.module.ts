import { DynamicModule, Module } from "@nestjs/common";
import { RequestContext } from "./request.context.js";

@Module({
  imports: [],
  providers: [RequestContext],
  exports: [RequestContext],
})
export class ContextModule {
  static forRoot(opt: { isGlobal: boolean }): DynamicModule {
    return {
      module: ContextModule,
      providers: [RequestContext],
      exports: [RequestContext],
      global: opt.isGlobal,
    };
  }
}
