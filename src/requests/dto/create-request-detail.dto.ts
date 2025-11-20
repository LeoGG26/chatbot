import { IsOptional,IsNumber, IsString } from "class-validator";


export class CreateRequestDetailDto {

    @IsNumber()
    @IsOptional()
    requestId: number;

    @IsString()
    name: string;

    @IsString()
    detail: string;

}