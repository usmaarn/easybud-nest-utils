// import { Queue } from '@/shared/lib/enums';
// import {
//   Injectable,
//   Logger,
//   OnModuleDestroy,
//   OnModuleInit,
// } from '@nestjs/common';
// import {
//   AmqpConnectionManager,
//   ChannelWrapper,
//   connect,
// } from 'amqp-connection-manager';
// import { ConfirmChannel } from 'amqplib';

// export type NotificationDto = {
//   type: Queue;
//   recipients: string[];
//   title: string;
//   body: string;
//   metadata: Record<string, any>;
// };

// @Injectable()
// export class QueueService implements OnModuleInit, OnModuleDestroy {
//   private connection!: AmqpConnectionManager;
//   private channel!: ChannelWrapper;
//   private readonly uri = process.env.RABBITMQ_URL!;
//   private readonly exhange = process.env.RABBITMQ_EXCHANGE!;
//   private readonly logger = new Logger(QueueService.name);

//   onModuleInit() {
//     this.connection = connect([this.uri]);
//     this.connection.on('connect', () => this.logger.log('Connected'));
//     this.connection.on('disconnect', (err) =>
//       this.logger.log('Disconnected', err?.err?.message),
//     );

//     this.channel = this.connection.createChannel({
//       json: true,
//       setup: (channel: ConfirmChannel) => {
//         this.logger.log('Setting up channel...');
//         return channel.assertExchange(this.exhange, 'topic', { durable: true });
//       },
//     });
//   }

//   async onModuleDestroy() {
//     await this.connection?.close();
//   }
//   async queue(dto: NotificationDto) {
//     this.channel.publish(this.exhange, dto.type, dto);
//   }
// }
