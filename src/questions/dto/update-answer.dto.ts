import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class UpdateAnswerDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    correct_id: number;
}
