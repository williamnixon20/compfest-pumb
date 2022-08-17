import { ApiProperty } from "@nestjs/swagger";
import { ResourceType } from "@prisma/client";
import {
    IsEnum,
    IsNotEmpty,
    IsString,
} from "class-validator";

export class UpdateResourceDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    name?: string;

    @IsNotEmpty()
    @IsString()
    @IsEnum(ResourceType)
    @ApiProperty({ enum: ResourceType })
    type?: ResourceType;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    url?: string;
}
