import { Module } from '@nestjs/common';
import { drizzleProvider, DRIZZLE } from './drizzle.provider';

@Module({
  providers: [drizzleProvider],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
