import { PartialType } from "@nestjs/mapped-types";
import { CreateHoursDto } from "./create-hours.dto";
import { IsNumber } from "class-validator";


export class UpdateHoursDto extends PartialType(CreateHoursDto) {
    @IsNumber()
    userId:number

}