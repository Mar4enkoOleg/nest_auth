import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UserModule } from './entities/user/user.module';
import { AuthModule } from './auth/auth.module';
import { DecodeMiddleware } from './auth/middlewares/decodeJwt.middleware';
import { UserController } from './entities/user/user.controller';

@Module({
  imports: [DatabaseModule, ConfigModule.forRoot(), UserModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DecodeMiddleware).forRoutes(UserController);
  }
}
