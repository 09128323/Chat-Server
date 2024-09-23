import {
    Injectable,
    NotFoundException,
    ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) {}

    async createUser(dto: CreateUserDto): Promise<User> {
        const existingUser = await this.userRepository.findOneBy({
            username: dto.username,
        });
        if (existingUser) {
            throw new ConflictException(
                `Пользователь с именем ${dto.username} уже существует`
            );
        }

        const user = this.userRepository.create({ username: dto.username });
        try {
            return await this.userRepository.save(user);
        } catch (error) {
            throw new Error(
                `Ошибка при сохранении пользователя: ${error.message}`
            );
        }
    }

    async getAllUsers(): Promise<User[]> {
        try {
            return await this.userRepository.find({ relations: ['chats'] });
        } catch (error) {
            throw new Error(
                `Ошибка при получении всех пользователей: ${error.message}`
            );
        }
    }

    async getUserByUsername(username: string): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { username },
            relations: ['chats'],
        });
        if (!user) {
            throw new NotFoundException(
                `Пользователь с именем ${username} не найден`
            );
        }
        return user;
    }
}
