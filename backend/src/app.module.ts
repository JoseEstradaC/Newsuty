import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { NewsModule } from './news/news.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/newsuty'),
    AuthModule,
    UsersModule,
    NewsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
