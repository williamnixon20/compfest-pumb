import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsUUID,
} from "class-validator";

export class CreateSubmissionDto {
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    question_id: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    option_id: string;
}