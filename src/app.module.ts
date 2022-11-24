import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TodoTaskModule } from './todo/todo-task.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { NestjsFormDataModule } from 'nestjs-form-data';


@Module({
  imports: [
    TodoTaskModule,
    MongooseModule.forRoot('mongodb://localhost'),
    AuthModule,
    UserModule,
    NestjsFormDataModule,
  ],
})
export class AppModule {}
