import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString
} from "class-validator";

export class CreateLectureDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    course_id: string;
}
