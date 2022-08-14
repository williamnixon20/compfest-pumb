import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
} from "class-validator";
import { OptionQuestion } from "../entities/option-question.entity";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    user_id: number;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ type: [OptionQuestion] })
    answers: OptionQuestion[];
}