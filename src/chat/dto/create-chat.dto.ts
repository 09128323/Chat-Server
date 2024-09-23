import { ApiProperty } from '@nestjs/swagger';
import {
    IsString,
    IsNotEmpty,
    IsArray,
    ArrayNotEmpty,
    IsNumber,
} from 'class-validator';
export class CreateChatDto {
    @ApiProperty({ description: 'Название чата' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ description: 'Список ID пользователей, участвующих в чате' })
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    users: number[];
}
