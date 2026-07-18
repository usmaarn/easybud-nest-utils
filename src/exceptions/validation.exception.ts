import { ErrorCode } from "@/lib/index.js";
import { BadRequestException, HttpExceptionOptions } from "@nestjs/common";

export class ValidationException<T extends object> extends BadRequestException {
  constructor(
    errors: Partial<Record<keyof T, string | string[]>>,
    descriptionOrOptions?: string | HttpExceptionOptions,
  ) {
    super(
      {
        errorCode: ErrorCode.INVALID_REQUEST_BODY,
        message: "invalid request body",
        errors,
      },
      descriptionOrOptions,
    );
  }
}
