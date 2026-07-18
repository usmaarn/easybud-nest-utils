export type SubscriptionStatus = 'active' | 'inactive' | 'expired';
export type PaymentStatus =
  'success' | 'failed' | 'pending' | 'reversed' | 'cancelled';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  message: string;
  data: T;
}

export interface SubscriptionPlan {
  id: number;
  service_name: string;
  name: string;
  description: string;
  code: string;
  price: number;
  billing_cycle: string;
  duration_days: number;
  created_at: string;
  updated_at: string;
}

export interface CreateSubscriptionPlanRequest {
  service_name: string;
  name: string;
  description: string;
  code: string;
  price: number;
  billing_cycle: BillingCircle;
  duration_days: number;
}

export type CreateSubscriptionPlanResponse = ApiResponse<SubscriptionPlan>;

export interface InitiateSubscriptionRequest {
  service: 'travel_buddy';
  payload: {
    transaction_type: 'subscription';
    plan_code: string;
    auto_renew: boolean;
    description?: string;
    context: string;
    context_id: string;
    subscription_type: 'promotion' | 'subscription';
    is_trial: boolean;
  };
}

export interface InitiateSubscriptionResponse {
  session_id: string;
  transaction: {
    id: number;
    reference: string;
  };
}

export interface ConfirmSubscriptionRequest {
  session_id: string;
  pin: string;
}

export interface CancelSubscriptionRequest {
  subscription_id: number;
}

export interface RenewSubscriptionRequest {
  subscription_id: string;
}

export interface SubscriptionResponse {
  user_id: number;
  service: string;
  subscription_plan_id: number;
  starts_at: string;
  ends_at: string;
  status: string;
  auto_renew: boolean;
  context: string;
  context_id: string;
  subscription_type: 'subscription' | 'promotion';
  updated_at: string;
  created_at: string;
  id: number;
  plan: SubscriptionPlan;
}

export interface InitiatePaymentDto {
  amount: number;
  description: string;
  transactionType: 'trip_payment';
  contextId: string;
  meta?: Record<string, unknown>;
}

export interface PaymentResponseDto {
  session_id: string;
  transaction: {
    id: number;
    reference: string;
  };
}

export interface ConfirmPaymentResponse {
  id: string;
  user_id: number;
  transaction_reference: string;
  service: string;
  amount: string;
  payload: {
    transaction_type: string;
    description: string;
    context_id: string;
    meta: Record<string, any>;
  };
  expires_at: string;
  pin_attempts: number;
  status: 'pending' | 'debited' | 'failed' | 'expired';
  created_at: string;
  updated_at: string;
}
