import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({ description: 'Уникальное имя пользователя' })
    @IsString()
    @IsNotEmpty()
    username: string;
}
