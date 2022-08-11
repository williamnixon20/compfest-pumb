import { ApiProperty } from "@nestjs/swagger";

export class CreateLectureDto {
    @ApiProperty()
    name: string;
    
    @ApiProperty()
    description: string;

    @ApiProperty()
    resource_url: string;
}
