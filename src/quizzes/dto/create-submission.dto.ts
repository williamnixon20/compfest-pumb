import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    question_id: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    option_id: number;
}