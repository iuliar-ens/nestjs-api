import { Module } from '@nestjs/common';
import { GuestModule } from './guest/guest.module';
import { GuestController } from './guest/guest.controller';
import { GuestService } from './guest/guest.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [GuestModule],
  controllers: [GuestController],
  providers: [PrismaService, GuestService],
})
export class AppModule {}
