import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ChatService {
    constructor(
        @InjectRepository(Chat) private chatRepository: Repository<Chat>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createChat(dto: CreateChatDto): Promise<Chat> {
        const users = await this.userRepository.findBy({ id: In(dto.users) });

        if (users.length !== dto.users.length) {
            throw new NotFoundException(
                `Один или несколько пользователей не найдены`
            );
        }

        const chat = this.chatRepository.create({
            name: dto.name,
            users,
        });

        try {
            return await this.chatRepository.save(chat);
        } catch (error) {
            throw new BadRequestException(
                `Ошибка при создании чата: ${error.message}`
            );
        }
    }

    async getUserChats(userId: number): Promise<Chat[]> {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new NotFoundException(
                `Пользователь с id ${userId} не найден`
            );
        }

        try {
            return await this.chatRepository.find({
                where: { users: { id: userId } },
                relations: ['users', 'messages'],
                order: {
                    created_at: 'DESC',
                },
            });
        } catch (error) {
            throw new Error(
                `Ошибка при получении чатов пользователя: ${error.message}`
            );
        }
    }
}
