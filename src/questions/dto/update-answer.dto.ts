import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class UpdateAnswerDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    correct_id: string;
}
