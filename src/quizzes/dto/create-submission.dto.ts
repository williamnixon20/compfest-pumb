import { ApiProperty } from "@nestjs/swagger";
import {
    IsArray,
    IsNotEmpty,
    IsNumber,
} from "class-validator";
import { CreateAnswerDto } from "./create-answer.dto";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    user_id: number;

    @IsNotEmpty()
    @IsArray()
    @ApiProperty({ type: [CreateAnswerDto] })
    answers: CreateAnswerDto[];
}