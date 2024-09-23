import { Controller, Post, Body } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './entities/message.entity';
import { MessageService } from './message.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Сообщения')
@Controller('messages')
export class MessageController {
    constructor(private readonly messageService: MessageService) {}

    @Post('add')
    @ApiOperation({ summary: 'Отправить сообщение в чат' })
    @ApiResponse({
        status: 201,
        description: 'Сообщение успешно отправлено',
        type: Message,
    })
    @ApiResponse({ status: 400, description: 'Некорректные данные' })
    @ApiBody({ type: CreateMessageDto })
    async createMessage(
        @Body() createMessageDto: CreateMessageDto
    ): Promise<Message> {
        return await this.messageService.createMessage(createMessageDto);
    }

    @Post('get')
    @ApiOperation({ summary: 'Получить сообщения чата' })
    @ApiResponse({
        status: 200,
        description: 'Сообщения чата успешно получены',
        type: [Message],
    })
    @ApiResponse({ status: 404, description: 'Сообщения не найдены' })
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                chat: { type: 'number', example: 1, description: 'ID чата' },
            },
        },
    })
    async getChatMessages(@Body('chat') chatId: number): Promise<Message[]> {
        return await this.messageService.getChatMessages(chatId);
    }
}
