import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdateLectureDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title?: string;
}
