import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class UpdateFeedbackDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    feedback: string;
}
