import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    statement: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    quiz_id: number;
}
