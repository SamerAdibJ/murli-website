import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MurlisModule } from './murlis/murlis.module';
import { BlessingsModule } from './blessings/blessings.module';
import { BookmarksModule } from './bookmarks/bookmarks.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', 'backend/.env'],
    }),
    MurlisModule,
    BlessingsModule,
    BookmarksModule,
    UsersModule,
    AuthModule,
    AdminModule,
    DrizzleModule,
  ],
})
export class AppModule {}
