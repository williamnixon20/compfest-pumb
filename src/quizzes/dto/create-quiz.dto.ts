import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class CreateQuizDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    course_id: number;
}
