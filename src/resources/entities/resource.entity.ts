import { ApiProperty } from "@nestjs/swagger";
import { ResourceType } from "@prisma/client";

export class Resource {
    @ApiProperty()
    id: number;

    @ApiProperty({ enum: ResourceType })
    type: ResourceType;
    
    @ApiProperty()
    url: string;
    
    @ApiProperty()
    lecture_id: number;
}