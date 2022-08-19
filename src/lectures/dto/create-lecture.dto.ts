import { ApiProperty } from "@nestjs/swagger";
import {
    IsNotEmpty,
    IsString,
    IsUUID
} from "class-validator";

export class CreateLectureDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    title: string;

    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    course_id: string;
}
