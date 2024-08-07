import { Injectable } from '@nestjs/common';
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
        const user = this.userRepository.create({
            username: dto.username,
        });
        return await this.userRepository.save(user);
    }

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find({ relations: ['chats'] });
    }

    async getUserByUsername(username: string): Promise<User> {
        return this.userRepository.findOne({
            where: { username },
            relations: ['chats'],
        });
    }
}
