import { Injectable } from '@nestjs/common';
import { NotificationDto, QueueService } from './queue-service';

@Injectable()
export class NotificationService {
  constructor(private readonly queueService: QueueService) {}

  send(dto: NotificationDto) {
    this.queueService.queue(dto);
  }
}
