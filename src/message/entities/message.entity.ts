import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор сообщения',
    })
    id: number;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    @ApiProperty({
        type: () => Chat,
        description: 'Чат, к которому относится сообщение',
    })
    chat: Chat;

    @ManyToOne(() => User)
    @ApiProperty({ type: () => User, description: 'Автор сообщения' })
    author: User;

    @Column()
    @ApiProperty({ example: 'Привет!', description: 'Текст сообщения' })
    text: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'Дата создания сообщения' })
    created_at: Date;
}
