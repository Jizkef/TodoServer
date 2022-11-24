import { Document } from 'mongoose';
import { FileSystemStoredFile } from 'nestjs-form-data';

export interface ITodoTask {
	title?: string;
	description?: string;
	dateOfCompletion?: Date;
	attachedFiles?: Array<FileSystemStoredFile>;
}