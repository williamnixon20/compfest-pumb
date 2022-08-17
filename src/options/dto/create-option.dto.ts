import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class CreateOptionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    question_id: number;
}
