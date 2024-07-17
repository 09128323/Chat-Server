import { Chat } from 'src/chat/entities/chat.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToMany,
    JoinTable,
} from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToMany(() => Chat, (chat) => chat.users)
    @JoinTable({
        name: 'user_chats',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'chat_id', referencedColumnName: 'id' },
    })
    chats: Chat[];
}
