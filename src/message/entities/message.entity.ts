import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Chat, (chat) => chat.messages)
    chat: Chat;

    @ManyToOne(() => User)
    author: User;

    @Column()
    text: string;

    @CreateDateColumn()
    created_at: Date;
}
