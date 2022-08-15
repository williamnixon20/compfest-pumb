import { ApiProperty } from "@nestjs/swagger";
import { Option } from "src/options/entities/option.entity";
import { Question } from "./question.entity";

export class FullQuestion extends Question {
    @ApiProperty({ type: [Option] })
    options: Option[];
}
