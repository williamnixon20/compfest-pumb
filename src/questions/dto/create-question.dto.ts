import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from "class-validator";

export class CreateQuestionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    statement: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    quiz_id: string;
}
