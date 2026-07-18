import { Global, Module } from "@nestjs/common";
import { NotificationService } from "./notification.service";
// import { QueueService } from './queue-service';
// import { NotificationListenerService } from './notification-listener.service';
// import { ClientsModule } from '@/clients/clients.module';

@Module({
  // imports: [ClientsModule],
  // providers: [NotificationService, QueueService, NotificationListenerService],
  exports: [NotificationService],
})
@Global()
export class NotificationModule {}
