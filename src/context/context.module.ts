import { DynamicModule, Module } from "@nestjs/common";
import { RequestContext } from "./request.context.js";

@Module({
  imports: [],
  providers: [RequestContext],
  exports: [RequestContext],
})
export class ContextModule {
  static register(opt: { global: boolean }): DynamicModule {
    return {
      module: ContextModule,
      providers: [RequestContext],
      exports: [RequestContext],
      global: opt.global,
    };
  }
}
