import { Permission } from '@/lib/config/permissions';

export type Paths<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? K | `${K}.${Paths<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

export type PaymentEventPayload = {
  id: string;
  user_id: number;
  service: string;
  amount: string;
  payload: string;
  expires_at: string;
  pin_attempts: 0;
  status: 'debited' | 'pending';
  created_at: string;
  updated_at: string;
};

export type User = {
  id: string;
};
