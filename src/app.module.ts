import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';  

import { AppController } from './app.controller';

import { CartModule } from './cart/cart.module';
import { AuthModule } from './auth/auth.module';
import { OrderModule } from './order/order.module';

import configuration from "../config";
import {dbConfig} from './db-config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    CartModule,
    OrderModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: () => {
        return dbConfig
      },
    })],
  controllers: [
    AppController,
  ],
  providers: [],
})

export class AppModule {}
