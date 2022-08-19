import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsUUID,
} from "class-validator";

export class UpdateAnswerDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    correct_id: string;
}
