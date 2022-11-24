import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { json } from 'express';
import { urlencoded } from "express";

async function start() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  app.use(urlencoded({ extended: true }))
  app.use(json()); 
  app.enableCors({ preflightContinue: true, origin: false });


  await app.listen(3000);
  console.log('Server started');
}
start();
