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

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => User, (user) => user.chats)
    users: User[];

    @OneToMany(() => Message, (message) => message.chat)
    messages: Message[];
}
