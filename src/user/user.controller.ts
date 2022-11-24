import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post('/signup')
    async createUser(
        @Body('password') password: string,
        @Body('username') username: string,
    ): Promise<User> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltOrRounds);
        const result = await this.userService.createUser(
            username,
            hashedPassword,
        );
        return result;
    }
}