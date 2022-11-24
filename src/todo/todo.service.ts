import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { FilterQuery, Model } from 'mongoose';
import { TodoTask, TodoTaskDocument } from 'src/schemas/todoTask.schema';
import { UserSchema } from 'src/schemas/user.schema';
import { ITodoTask } from './todo.interface';


@Injectable()
export class TodoService {
	constructor(
		@InjectModel('Todotask') private readonly toDoTaskModel: Model<TodoTaskDocument>,
	){}

	public async createTask(form: ITodoTask, user: string): Promise<TodoTask> {
		console.log('USER', user);
		const createdTask: TodoTask = await this.toDoTaskModel.create({...form, user: new mongoose.mongo.ObjectId(user) });
		return createdTask;
	}

	public async getTask(
		filter: FilterQuery<TodoTask> = {}): Promise<TodoTask> {
		try {
			const task: TodoTask = await this.toDoTaskModel.findOne(filter).exec();
			return task;

		} catch(err) {
			throw err
		}
	}

	public async getTasks(
		filter: FilterQuery<TodoTask> = {},
		skip: number = 0,
		limit?: number): Promise<TodoTask[]> {
		try {
			const tasks: TodoTask[] = await this.toDoTaskModel
				.find(filter)
				.sort({ _id: 1 })
				.skip(skip)
				.limit(limit)
				.exec();

			return tasks;

		} catch (err) {
			throw err;
		}
	}

	public async updateTask(form: ITodoTask, _id: string, user: string): Promise<void> {
		try {

			await this.toDoTaskModel
				.update({ _id: new mongoose.mongo.ObjectId(_id), user}, {...form})
				.exec();

		} catch (err) {
			throw err;
		}
	}

	public async deleteTask(_id: string, user: string): Promise<void> {
		try {
			await this.toDoTaskModel
				.deleteOne({_id, user})
				.exec();
		} catch (err) {
			throw err
		}
	}

}



