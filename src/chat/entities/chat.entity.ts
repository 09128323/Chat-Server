import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    @ApiProperty({ example: 1, description: 'Уникальный идентификатор чата' })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'Общий чат', description: 'Название чата' })
    name: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'Дата создания чата' })
    created_at: Date;

    @ManyToMany(() => User, (user) => user.chats)
    @ApiProperty({
        type: () => [User],
        description: 'Список пользователей, участвующих в чате',
    })
    users: User[];

    @OneToMany(() => Message, (message) => message.chat)
    @ApiProperty({
        type: () => [Message],
        description: 'Список сообщений в чате',
    })
    messages: Message[];
}
