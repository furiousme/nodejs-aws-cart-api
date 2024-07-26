import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';  

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import configuration from "../config";

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return ({
          type: 'postgres',
          host: configService.get("DATABASE.DB_HOST"),
          port:  configService.get("DATABASE.DB_PORT"),
          username:  configService.get("DATABASE.DB_USER"),
          password:  configService.get("DATABASE.DB_PASSWORD"),
          database: configService.get("DATABASE.DB_NAME"),
          entities: [__dirname + "/**/*.entity.js"],
          ssl: true,
          extra: {
            ssl: {
              rejectUnauthorized: false
            },
          },
        })
      },
    }),
  ],
  controllers: [
    AppController,
  ],
  providers: [],
})
export class AppModule {}
