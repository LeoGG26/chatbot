import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgendaService } from '../services/agenda.service';
import { CreateAgendaDto } from '../dto/create-agenda.dto';
import { UpdateAgendaDto } from '../dto/update-agenda.dto';
import { HoursService } from '../services/hours.service';
import { UpdateHoursDto } from '../dto/update-hours.dto';

@Controller('hours')
export class HoursController {
  constructor(private readonly hoursService: HoursService) {}

  @Post()
  create(@Body() createAgendaDto: CreateAgendaDto) {
    return this.hoursService.create(createAgendaDto);
  }

  @Get()
  findAll() {
    return this.hoursService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hoursService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHoursDto: UpdateHoursDto) {
    return this.hoursService.update(+id, updateHoursDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hoursService.remove(+id);
  }
}
