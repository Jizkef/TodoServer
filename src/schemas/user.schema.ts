import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';
 import * as mongoose from 'mongoose';
import { TodoTask } from './todoTask.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop()
  username: string;

  @Prop()
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Todotask'}] })
  todotask: TodoTask[];

}

export const UserSchema = SchemaFactory.createForClass(User);