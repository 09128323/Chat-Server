import { Controller, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post('add')
    async createMessage(
        @Body() createMessageDto: CreateMessageDto
    ): Promise<Message> {
        return await this.messageService.createMessage(createMessageDto);
    }

    @Post('get')
    async getChatMessages(@Body('chat') chatId: number): Promise<Message[]> {
        return await this.messageService.getChatMessages(chatId);
    }
}
