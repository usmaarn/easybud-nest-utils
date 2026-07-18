import { ErrorCode } from "@/lib";
import { InternalServerErrorException } from "@nestjs/common";

export class GatewayException extends InternalServerErrorException {
  constructor(message: string, service: string, meta: any) {
    super({
      errorCode: ErrorCode.GATEWAY_EXCEPTION,
      message,
      service,
      meta,
    });
  }
}
