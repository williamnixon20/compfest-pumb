import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    statement: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    quiz_id: string;
}
