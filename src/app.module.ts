import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: '123456',
            database: 'chat_db',
            synchronize: true,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        UserModule,
        ChatModule,
        MessageModule,
    ],
})
export class AppModule {}
