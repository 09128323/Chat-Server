import { Controller, Post, Body, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';
import {
    ApiBody,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('Чаты')
@Controller('chats')
export class ChatController {
    constructor(private readonly chatsService: ChatService) {}

    @Post('add')
    @ApiOperation({ summary: 'Создать новый чат' })
    @ApiResponse({ status: 201, description: 'Чат успешно создан', type: Chat })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateChatDto })
    async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
        return await this.chatsService.createChat(createChatDto);
    }

    @Get('get')
    @ApiOperation({ summary: 'Получить список чатов пользователя' })
    @ApiResponse({
        status: 200,
        description: 'Список чатов успешно получен',
        type: [Chat],
    })
    @ApiResponse({ status: 404, description: 'Чаты не найдены' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                user: {
                    type: 'number',
                    example: 1,
                    description: 'ID пользователя',
                },
            },
        },
    })
    async getUserChats(userId: number): Promise<Chat[]> {
        return await this.chatsService.getUserChats(userId);
    }
}
