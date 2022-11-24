import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types} from 'mongoose';
import Multer from 'multer';
import { User } from './user.schema';
import * as mongoose from 'mongoose'


export type TodoTaskDocument = TodoTask & Document;

@Schema()
export class TodoTask {
    //limit(limitOfDocuments: number) {
        //throw new Error('Method not implemented.');
    //}

	@Prop({ required: true })
	title: string;

	@Prop()
	description: string;

	@Prop()
	dateOfCompletion: Date;

	@Prop()
	attachedFiles: Array<Express.Multer.File>;

	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  	user: User;

}

export const TodoTaskSchema = SchemaFactory.createForClass(TodoTask);

