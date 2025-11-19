import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CreateDayDto } from "./create-day.dto";

export class CreateAgendaDto {

    @IsNumber()
    year: number;

    @IsNumber()
    month: number

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=>CreateDayDto)
    days: CreateDayDto[];
}
