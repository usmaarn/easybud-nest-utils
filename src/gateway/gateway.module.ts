import { Module } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { AuthService } from "../jwt/users.service";

@Module({
  imports: [],
  providers: [AuthService, PaymentService],
  exports: [AuthService, PaymentService],
})
export class GatewayModule {}
