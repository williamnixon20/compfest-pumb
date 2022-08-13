import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class CreateAnswerDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    option_id: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    feedback: string;
}
