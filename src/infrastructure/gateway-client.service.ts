// import { session } from '@/shared/lib/session';
// import { User } from '@/shared/lib/types';
// import { ConfigService } from '@/old/config/config.service';
// import { Injectable, Logger } from '@nestjs/common';
// import {
//   CancelSubscriptionRequest,
//   ConfirmPaymentResponse,
//   ConfirmSubscriptionRequest,
//   CreateSubscriptionPlanRequest,
//   InitiatePaymentDto,
//   InitiateSubscriptionRequest,
//   PaymentResponseDto,
// } from './gateway-types';
// import { RedisService } from './redis.service';

// @Injectable()
// export class GatewayClient {
//   private logger = new Logger(GatewayClient.name);
//   private client: any;

//   constructor(
//     private redis: RedisService,
//     private config: ConfigService,
//   ) {
//     // this.client = new RestClient({
//     //   baseUrl: config.getOrThrow('gateway_url'),
//     // });
//   }

//   async getUserProfile(
//     userId: string,
//     accessToken?: string,
//   ): Promise<User | null> {
//     const user = await this.redis.get<User>('users:' + userId);
//     if (user) return user;

//     // const res = await this.client.get<ApiResponse<User>>(`/auth/api/profile`, {
//     //   headers: {
//     //     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//     //   },
//     // });

//     // if (res.success) {
//     //   await this.redis.set('users:' + userId, res.data.data);
//     //   return res.data.data;
//     // }
//     return null;
//   }

//   async getPublicKey(): Promise<string> {
//     this.logger.log('Getting JWT public key from redis...');
//     const publicKey = await this.redis.get<string>('api_public_key');
//     if (publicKey) {
//       return publicKey;
//     }
//     this.logger.error('JWT public key not found in redis...');
//     this.logger.log('Getting JWT public key from server...');
//     // const res = await this.client.get<string>('/auth/api/public-key');
//     // if (res.success) {
//     //   this.logger.log('JWT Public Key fetched successfully.', res);
//     //   await this.redis.set('api_public_key', res.data);
//     //   this.logger.log('JWT Public Key cached with redis.');
//     //   return res.data;
//     // }
//     // this.logger.error('Unable to get public key:', res);
//     return '';
//   }

//   async upsertSubscriptionPlan(
//     payload: CreateSubscriptionPlanRequest,
//     planId?: string,
//   ) {
//     if (planId) return;
//     const endpoint = '/payment/api/subscription/create-plan';
//     return await this.sendRequest(endpoint, payload, true);
//   }

//   async initiateSubscription(payload: InitiateSubscriptionRequest) {
//     const endpoint = '/payment/api/subscription/initiate';
//     return await this.sendRequest(endpoint, payload, true);
//   }

//   async confirmSubscription(payload: ConfirmSubscriptionRequest) {
//     const endpoint = '/payment/api/subscription/subscribe';
//     return await this.sendRequest(endpoint, payload, true);
//   }

//   async cancelSubscription(payload: CancelSubscriptionRequest) {
//     const endpoint = '/payment/api/subscription/cancel-subscription';
//     return await this.sendRequest(endpoint, payload, true);
//   }

//   async renewSubscription(payload: CancelSubscriptionRequest) {
//     const endpoint = '/payment/api/subscription/renew-subscription';
//     return await this.sendRequest(endpoint, payload, true);
//   }

//   async getPlanList() {
//     const appName = this.config.getOrThrow('app.name');
//     const endpoint = '/payment/api/subscription/plans/' + appName;
//     return await this.sendRequest(endpoint);
//   }

//   async getSubscriptionDetails(subscriptionId: number) {
//     const endpoint = '/payment/api/subscription/details/' + subscriptionId;
//     return await this.sendRequest(endpoint);
//   }

//   async initiatePayment(dto: InitiatePaymentDto) {
//     const endpoint = '/payment/api/transaction/initiate';

//     const data = {
//       service: this.config.getOrThrow('app.name'),
//       amount: dto.amount,
//       payload: {
//         transaction_type: dto.transactionType,
//         description: dto.description,
//         context_id: dto.contextId,
//         meta: dto.meta,
//       },
//     };

//     return await this.sendRequest<PaymentResponseDto>(endpoint, data, true);
//   }

//   async confirmPayment(sessionId: string, pin: string) {
//     const endpoint = '/payment/api/transaction/verify-pin';
//     const data = {
//       session_id: sessionId,
//       pin,
//     };
//     return await this.sendRequest<ConfirmPaymentResponse>(endpoint, data, true);
//   }

//   async getUserSubscriptions() {
//     const endpoint =
//       '/payment/api/subscription/get-user-subscriptions?service=travel_buddy';
//     const res = await this.sendRequest(endpoint);
//     // return res.data as SubscriptionResponse[];
//   }

//   async sendRequest<T = any>(endpoint: string, payload?: any, isPost = false) {
//     const accessToken = session.get('accessToken');
//     const options = {
//       headers: {
//         ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//       },
//     };

//     // let response: RestClientResponse<ApiResponse<T>>;

//     // if (isPost) {
//     //   response = await this.client.post<ApiResponse<T>>(
//     //     endpoint,
//     //     payload,
//     //     options,
//     //   );
//     // } else {
//     //   response = await this.client.get<ApiResponse<T>>(endpoint, options);
//     // }

//     // if (!response.success) {
//     //   this.logger.error('Gateway Error: ', { endpoint, response });
//     //   throw new GatewayException(response.message, 'payment', {
//     //     path: endpoint,
//     //     data: response.data['errors'],
//     //   });
//     // }
//     // return response.data.data;
//   }
// }
