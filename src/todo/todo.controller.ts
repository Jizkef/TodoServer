import { Controller, Get, Headers, Post, Delete, Body, Param, Patch, UseInterceptors, UploadedFile, UseGuards, UnauthorizedException, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { ITodoTask } from './todo.interface';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtService } from '@nestjs/jwt';
import { PaginationParams } from 'src/pagination/paginationParams';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { FormDataDto } from 'src/dto/formData.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { IUserJwt } from 'src/auth/auth.service';


@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService, private jwtService: JwtService) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async create(
    @Body() form: ITodoTask,
    @Headers('Authorization') authorization = '') {
    const jwt: IUserJwt = await this.getJwt(authorization)
    const userId: string = jwt['sub']
      await this.todoService.createTask(form, userId);
  }

  @Post('/load/:id')
  @FormDataRequest({storage: FileSystemStoredFile})
  async UploadFile(@Body() testDto: FormDataDto,
    @Param('id') _id: string,
    @Headers('Authorization') authorization = ''): Promise<void> {
    const jwt: IUserJwt = await this.getJwt(authorization)
    const userId: string = jwt['sub']
    const { attachedFiles } = testDto;
    console.log(testDto);
    await this.todoService.updateTask({ attachedFiles }, _id, userId)
  }
  

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Headers('Authorization') authorization = '',
    @Query() { skip, limit }: PaginationParams){
    const jwt: IUserJwt = await this.getJwt(authorization)
    const userId: string = jwt['sub']
    return this.todoService.getTasks({ user: userId }, skip, limit);
  }

  @Get('/:id')
  async findOne(@Param('id') _id: number,
    @Headers('Authorization') authorization = ''){
    const jwt: IUserJwt = await this.getJwt(authorization)
    const userId: string = jwt['sub']
    return this.todoService.getTask({ user: userId, _id});
  }

  @Patch('/:id')
  async update(
    @Param('id') _id: string,
    @Body() form: ITodoTask,
    @Headers('Authorization') authorization = '') {
    const jwt: IUserJwt = await this.getJwt(authorization)
    const userId: string = jwt['sub']
    await this.todoService.updateTask(form, _id, userId);
    return await this.todoService.getTask({ user: userId, _id});
  }

  @Delete('/:id')
  async delete(@Param('id') _id: string,
    @Headers('Authorization') authorization = ''){
    const jwt: IUserJwt = await this.getJwt(authorization)
    const userId: string = jwt['sub'];
    this.todoService.deleteTask(_id, userId);

  }

  public async getJwt(authorization: string): Promise<IUserJwt> {

    let bearer: string = '';

    if (typeof authorization != 'undefined'){
      bearer = authorization.replace('Bearer ', '');
    }
    
    if (bearer === ''){
      throw new UnauthorizedException('No Token provided!');
    }

    const jwt: IUserJwt = this.jwtService.decode(bearer) as IUserJwt;
    return jwt;
  }
}



