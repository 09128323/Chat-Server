import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost', // Ваш хост
            port: 5432, // Ваш порт
            username: 'postgres', // Ваше имя пользователя
            password: '123456', // Ваш пароль
            database: 'chat_db', // Ваше имя базы данных
            synchronize: true,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
        }),
        UserModule,
        ChatModule,
        MessageModule,
    ],
})
export class AppModule {}
