import { ApiProperty } from "@nestjs/swagger";
import { ResourceType } from "@prisma/client";

export class Resource {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ enum: ResourceType })
    type: ResourceType;
    
    @ApiProperty()
    url: string;
    
    @ApiProperty()
    lecture_id: string;
}