import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';

import helmet from 'helmet';

import { AppModule } from './app.module';

let cachedServer: Handler;

async function bootstrap() {
  const expressApp = express();

  const app = await NestFactory.create(AppModule,
    new ExpressAdapter(expressApp),
);
  await app.init();

  app.enableCors({
    origin: (req, callback) => callback(null, true),
  });
  
  app.use(helmet());

  cachedServer = serverlessExpress({ app: expressApp });

  return cachedServer;
}

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrap();
  return server(event, context, callback);
};
