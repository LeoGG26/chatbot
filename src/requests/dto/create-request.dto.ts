import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { CreateRequestDetailDto } from "./create-request-detail.dto";

export class CreateRequestDto {

    @IsString()
    requestType: string;

    @IsString()
    description: string;

    @IsString()
    @IsOptional()
    userPhoneNumber: string;

    @IsNumber()
    @IsOptional()
    userId: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateRequestDetailDto)
    requestDetails: CreateRequestDetailDto[];
}
