import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message)
        private messageRepository: Repository<Message>,
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createMessage(dto: CreateMessageDto): Promise<Message> {
        const chat = await this.chatRepository.findOneBy({ id: dto.chat });
        if (!chat) {
            throw new NotFoundException(`Чат с id ${dto.chat} не найден`);
        }

        const user = await this.userRepository.findOneBy({ id: dto.author });
        if (!user) {
            throw new NotFoundException(
                `Пользователь с id ${dto.author} не найден`
            );
        }

        const message = this.messageRepository.create({
            text: dto.text,
            chat,
            author: user,
        });

        try {
            return await this.messageRepository.save(message);
        } catch (error) {
            throw new BadRequestException(
                `Ошибка при создании сообщения: ${error.message}`
            );
        }
    }

    async getChatMessages(chatId: number): Promise<Message[]> {
        const chat = await this.chatRepository.findOneBy({ id: chatId });
        if (!chat) {
            throw new NotFoundException(`Чат с id ${chatId} не найден`);
        }

        try {
            return await this.messageRepository.find({
                where: { chat: { id: chatId } },
                relations: ['chat', 'author'],
                order: {
                    created_at: 'ASC',
                },
            });
        } catch (error) {
            throw new Error(`Ошибка при получении сообщений: ${error.message}`);
        }
    }
}
