import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('add')
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Get('all')
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Post('get-by-username')
    async getUserByUsername(@Body('username') username: string): Promise<User> {
        return await this.usersService.getUserByUsername(username);
    }
}
