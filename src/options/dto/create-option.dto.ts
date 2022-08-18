import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class CreateOptionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    question_id: string;
}
