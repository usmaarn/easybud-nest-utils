import { Injectable } from "@nestjs/common";

export type PaymentEventPayload = {
  id: string;
  user_id: number;
  service: string;
  amount: string;
  payload: string;
  expires_at: string;
  pin_attempts: 0;
  status: "debited" | "pending";
  created_at: string;
  updated_at: string;
};

@Injectable()
export class PaymentService {}
