import { Module } from '@nestjs/common';
import { AuthService } from './services/users.service';
import { PaymentService } from './services/payment.service';

@Module({
  imports: [],
  providers: [AuthService, PaymentService],
  exports: [AuthService, PaymentService],
})
export class GatewayModule {}
