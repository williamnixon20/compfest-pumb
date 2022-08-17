import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
} from "class-validator";

export class UpdateOptionDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    content?: string;
}
