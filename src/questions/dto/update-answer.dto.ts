import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsNumber,
} from "class-validator";

export class UpdateAnswerDto {
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    option_id: number;
}
