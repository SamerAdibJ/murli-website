import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MurlisModule } from './murlis/murlis.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [ConfigModule.forRoot(), MurlisModule, DrizzleModule],
})
export class AppModule {}
