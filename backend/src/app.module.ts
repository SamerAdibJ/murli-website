import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MurlisModule } from './murlis/murlis.module';
import { BlessingsModule } from './blessings/blessings.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MurlisModule,
    BlessingsModule,
    BookmarksModule,
    DrizzleModule,
  ],
})
export class AppModule {}
