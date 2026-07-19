import { Module } from '@nestjs/common';
import { MurlisController } from './murlis.controller';
import { MurlisListController } from './murlis-list.controller';
import { MurlisService } from './murlis.service';
import { DrizzleModule } from '../drizzle/drizzle.module';

@Module({
  imports: [DrizzleModule],
  controllers: [MurlisController, MurlisListController],
  providers: [MurlisService],
})
export class MurlisModule {}
