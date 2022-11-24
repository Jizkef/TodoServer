import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { TodoTaskSchema } from 'src/schemas/todoTask.schema';
import { JwtService } from '@nestjs/jwt';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Todotask', schema: TodoTaskSchema },
    ]),
    NestjsFormDataModule,
  ],
  controllers: [TodoController],
  providers: [TodoService, JwtService],
})
export class TodoTaskModule {}
