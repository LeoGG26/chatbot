import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, ValidateNested } from "class-validator";
import { CreateHoursDto } from "./create-hours.dto";

export class CreateDayDto {
    @IsNumber()
    day: number;

    @IsNumber()
    @IsOptional()
    agendaId: number;

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(()=>CreateHoursDto)
    hours: CreateHoursDto[];

}