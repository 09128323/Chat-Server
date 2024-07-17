import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { Chat } from './entities/chat.entity';

@Controller('chats')
export class ChatController {
    constructor(private readonly chatsService: ChatService) {}

    @Post('add')
    async createChat(@Body() createChatDto: CreateChatDto): Promise<Chat> {
        return await this.chatsService.createChat(createChatDto);
    }

    @Post('get')
    async getUserChats(@Body('user') userId: number): Promise<Chat[]> {
        return await this.chatsService.getUserChats(userId);
    }
}
