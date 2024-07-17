import { Injectable } from '@nestjs/common';
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
        const user = await this.userRepository.findOneBy({ id: dto.author });
        const message = this.messageRepository.create({
            text: dto.text,
            chat,
            author: user,
        });
        return await this.messageRepository.save(message);
    }

    async getChatMessages(chatId: number): Promise<Message[]> {
        return this.messageRepository.find({
            where: { chat: { id: chatId } },
            relations: ['chat', 'author'],
            order: {
                created_at: 'ASC',
            },
        });
    }
}
