import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service.js";
import { AuthService } from "../jwt/users.service.js";

@Module({
  imports: [],
  providers: [AuthService, PaymentService],
  exports: [AuthService, PaymentService],
})
export class GatewayModule {}
