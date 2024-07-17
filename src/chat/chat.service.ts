import { Injectable } from '@nestjs/common';
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
        const users = await this.userRepository.findBy({
            id: In(dto.users),
        });
        const chat = this.chatRepository.create({
            name: dto.name,
            users,
        });
        return await this.chatRepository.save(chat);
    }

    async getUserChats(userId: number): Promise<Chat[]> {
        return this.chatRepository.find({
            where: { users: { id: userId } },
            relations: ['users', 'messages'],
            order: {
                created_at: 'DESC',
            },
        });
    }
}
