import { HasMimeType, IsFile, MaxFileSize, FileSystemStoredFile } from "nestjs-form-data";
import { ITodoTask } from "src/todo/todo.interface";

export class FormDataDto implements Pick<ITodoTask, 'attachedFiles'> {
	@IsFile()
	@MaxFileSize(1e6, { each: true })
	@HasMimeType(['image/jpeg', 'image/png', 'document/doc/', 'document/docx', 
		'document/docm', 'document/pdf', 'files/zip', 'video/mp4', 'file/pptx'], { each: true })
	attachedFiles: FileSystemStoredFile[];

}