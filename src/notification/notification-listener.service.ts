// import { RedisService } from '@/clients/redis.service';
import { config } from '@/old/config/configuration';
// import { TripStatus } from '@/common/utils/enums';
import { PaymentEventPayload } from '@/shared/lib/types';
// import { Profile } from '@/profiles/domain/profile';
// import { Trip } from '@/trips/domain/entities/trip.entity';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import {
  AmqpConnectionManager,
  ChannelWrapper,
  connect,
} from 'amqp-connection-manager';
import { ConfirmChannel } from 'amqplib';
import { EntityManager } from 'typeorm';

@Injectable()
export class NotificationListenerService
  implements OnModuleInit, OnModuleDestroy
{
  private connection!: AmqpConnectionManager;
  private channel!: ChannelWrapper;

  private readonly uri = process.env.RABBITMQ_URL!;
  private readonly exchange = process.env.RABBITMQ_EXCHANGE!;

  private readonly logger = new Logger(NotificationListenerService.name);

  private handlers: Record<string, (payload: any) => Promise<void>> = {
    'user.updated': this.handleUserUpdated.bind(this),
    'user.settings.updated': this.handleUserSettingsUpdated.bind(this),
    [`payment.debit.${config.app.name}`]: this.handlePaymentDebit.bind(this),
    'payment.subscription.created': this.handleSubscription.bind(this),
    'payment.subscription.renewed': this.handleSubscription.bind(this),
  };

  constructor(
    // private readonly redis: RedisService,
    private readonly entityManager: EntityManager,
  ) {}

  onModuleInit() {
    this.connection = connect([this.uri]);

    this.connection.on('connect', () => {
      this.logger.log('RabbitMQ Connected');
    });

    this.connection.on('disconnect', (err) => {
      this.logger.error(`RabbitMQ Disconnected: ${err?.err?.message}`);
    });

    this.channel = this.connection.createChannel({
      setup: async (channel: ConfirmChannel) => {
        this.logger.log('Setting up RabbitMQ channel...');

        // create exchange
        await channel.assertExchange(this.exchange, 'topic', {
          durable: true,
        });

        // create queues + bindings + consumers
        for (const routingKey of Object.keys(this.handlers)) {
          const q = await channel.assertQueue(routingKey, {
            durable: true,
          });

          await channel.bindQueue(q.queue, this.exchange, routingKey);

          await channel.consume(q.queue, async (msg) => {
            if (!msg) return;

            try {
              const content = JSON.parse(msg.content.toString());

              this.logger.log(
                `Received event [${routingKey}]: ` + msg.content.toString(),
              );

              const handler = this.handlers[routingKey];
              if (handler) {
                await handler(content);
              } else {
                this.logger.warn(`Unhandled event: ${routingKey}`);
              }

              channel.ack(msg);
            } catch (error) {
              this.logger.error(error);

              // reject message
              channel.nack(msg, false, false);
            }
          });
        }
      },
    });
  }

  async onModuleDestroy() {
    await this.connection?.close();
  }

  private async handleUserUpdated(payload: any) {
    this.logger.log(`Processing user.updated for user: ${payload.user.id}`);

    if (payload.user) {
      const key = `users:` + payload.user.id;
      const user = payload.user;

      if (Array.isArray(user.settings)) {
        const settings = {};
        user.settings.forEach((setting) => {
          settings[setting.key] = setting.value;
        });
        user.settings = settings;
      }

      await this.entityManager.transaction(async (m) => {
        // await this.redis.set(key, user);
        // const profile = await m.findOneBy(Profile, { userId: user.id });
        // if (profile) {
        //   profile.updateUserInfo(user);
        //   await m.save(profile);
        //   this.logger.log(`Profile with id ${profile.userId} updated`);
        // }
      });
    }
  }

  private async handleUserSettingsUpdated(payload: any) {
    const key = 'users:' + payload.user_id;
    // const user = await this.redis.get(key);
    // if (user) {
    //   user.settings = payload.settings;
    //   await this.redis.set(key, user);
    //   this.logger.log('Updated cache: ' + key);
    // } else {
    //   this.logger.warn('Cannot find cache: ' + key);
    // }
  }

  private async handlePaymentDebit(data: PaymentEventPayload) {
    this.logger.log(`Processing payment.debit`);
    if (data.payload) {
      // const payload = JSON.parse(data.payload);
      // const trip = await this.entityManager.findOneBy(Trip, {
      //   id: payload.contextId,
      // });
      // if (trip && data.status) {
      // trip.status =
      //   data.status == 'debited'
      //     ? TripStatus.ACTIVE
      //     : TripStatus.PAYMENT_FAILED;
      // await this.entityManager.save(trip);
      // }
    }
  }

  private async handleSubscription(payload: SubscriptionEventPayload) {
    if (payload.meta.service_name === config.app.name) {
      // const profile = await this.entityManager.findOneBy(Profile, {
      //   userId: payload.subscription.user_id.toString(),
      // });
      // if (profile) {
      //   profile.subscription = {
      //     id: payload.subscription.id,
      //     planCode: payload.subscription.plan.code,
      //     planId: payload.subscription.subscription_plan_id,
      //     startDate: new Date(payload.subscription.starts_at),
      //     autoRenew: payload.subscription.auto_renew,
      //     endDate: new Date(payload.subscription.ends_at),
      //     status: payload.subscription.status,
      //   };
      // await this.entityManager.save(profile);
      // }
    }
  }
}
