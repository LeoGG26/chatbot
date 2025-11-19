import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateHoursDto {
    @IsString()
    hour: string;

    @IsNumber()
    @IsOptional()
    dayId: number;

    @IsBoolean()
    @IsOptional()
    isAvailable: boolean;
}