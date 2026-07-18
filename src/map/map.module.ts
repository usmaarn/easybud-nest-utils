import { Module } from '@nestjs/common';
import { MapController } from './map.controller';
import { MapService } from './map.service';
// import { ClientsModule } from '@/clients/clients.module';

@Module({
  // imports: [ClientsModule],
  controllers: [MapController],
  providers: [MapService],
})
export class MapModule {}
