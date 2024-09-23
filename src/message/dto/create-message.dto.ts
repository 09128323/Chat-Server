import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessageDto {
    @ApiProperty({ description: 'ID чата, к которому относится сообщение' })
    @IsNumber()
    @IsNotEmpty()
    chat: number;

    @ApiProperty({ description: 'ID автора сообщения' })
    @IsNumber()
    @IsNotEmpty()
    author: number;

    @ApiProperty({ description: 'Текст сообщения' })
    @IsString()
    @IsNotEmpty()
    text: string;
}
