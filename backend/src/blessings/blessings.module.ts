import { Module } from '@nestjs/common';
import { BlessingsAdminController } from './blessings-admin.controller';
import { BlessingUserController } from './blessing-user.controller';
import { BlessingsService } from './blessings.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [BlessingsAdminController, BlessingUserController],
  providers: [BlessingsService],
})
export class BlessingsModule {}
