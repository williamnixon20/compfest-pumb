import { ApiProperty } from "@nestjs/swagger";

export class Lecture {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    resource_url: string;

    constructor(id: number, name: string, description: string, resource_url: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.resource_url = resource_url;
    }
}
