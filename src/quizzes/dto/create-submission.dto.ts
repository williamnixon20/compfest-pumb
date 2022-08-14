import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
    ArrayMaxSize,
    ArrayMinSize,
    IsArray,
    IsNotEmpty,
    IsNumber,
    ValidateNested,
} from "class-validator";
import { OptionQuestion } from "../entities/option-question.entity";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    user_id: number;

    @IsNotEmpty()
    @IsArray()
    @ValidateNested({ each: true })
    @ArrayMinSize(2)
    @ArrayMaxSize(2)
    @Type(() => OptionQuestion)
    @ApiProperty({ type: [OptionQuestion] })
    answers: OptionQuestion[];
}