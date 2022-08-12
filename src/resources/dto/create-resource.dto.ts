import { ApiProperty } from "@nestjs/swagger";
import { ResourceType } from "@prisma/client";
import {
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class CreateResourceDto {
    @IsNotEmpty()
    @IsString()
    @IsEnum(ResourceType)
    @ApiProperty({ enum: ResourceType })
    type: ResourceType;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    url: string;
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    lecture_id: number;
}
