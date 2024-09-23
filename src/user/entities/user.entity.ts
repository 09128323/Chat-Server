import { Chat } from 'src/chat/entities/chat.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @ApiProperty({
        example: 1,
        description: 'Уникальный идентификатор пользователя',
    })
    id: number;

    @Column({ unique: true })
    @ApiProperty({ example: 'ivanivanov', description: 'Имя пользователя' })
    username: string;

    @CreateDateColumn()
    @ApiProperty({ description: 'Дата создания пользователя' })
    created_at: Date;

    @ManyToMany(() => Chat, (chat) => chat.users)
    @JoinTable({
        name: 'user_chats',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'chat_id', referencedColumnName: 'id' },
    })
    @ApiProperty({
        type: () => [Chat],
        description: 'Список чатов, в которых участвует пользователь',
    })
    chats: Chat[];
}
