import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    question_id: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    option_id: string;
}