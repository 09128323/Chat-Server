import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Пользователи')
@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService) {}

    @Post('add')
    @ApiOperation({ summary: 'Создать нового пользователя' })
    @ApiResponse({
        status: 201,
        description: 'Пользователь успешно создан',
        type: User,
    })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateUserDto })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
        return await this.usersService.createUser(createUserDto);
    }

    @Get('all')
    @ApiOperation({ summary: 'Получить список всех пользователей' })
    @ApiResponse({
        status: 200,
        description: 'Список пользователей успешно получен',
        type: [User],
    })
    @ApiResponse({ status: 404, description: 'Пользователи не найдены' })
    async getAllUsers(): Promise<User[]> {
        return await this.usersService.getAllUsers();
    }

    @Post('get-by-username')
    @ApiOperation({ summary: 'Найти пользователя по имени' })
    @ApiResponse({
        status: 200,
        description: 'Пользователь успешно найден',
        type: User,
    })
    @ApiResponse({ status: 404, description: 'Пользователь не найден' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                username: {
                    type: 'string',
                    example: 'ivanivanov',
                    description: 'Имя пользователя',
                },
            },
        },
    })
    async getUserByUsername(@Body('username') username: string): Promise<User> {
        return await this.usersService.getUserByUsername(username);
    }
}
