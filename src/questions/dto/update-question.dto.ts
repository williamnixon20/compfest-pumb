import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class UpdateQuestionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    statement?: string;
}
