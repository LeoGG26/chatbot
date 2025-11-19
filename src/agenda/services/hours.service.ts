import { Injectable } from '@nestjs/common';
import { CreateAgendaDto } from '../dto/create-agenda.dto';
import { UpdateAgendaDto } from '../dto/update-agenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agenda } from '../entities/agenda.entity';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Hours } from '../entities/hours.entity';
import { Day } from '../entities/days.entity';
import { UpdateHoursDto } from '../dto/update-hours.dto';


@Injectable()
export class HoursService {

  constructor(
    @InjectRepository(Hours,'chatbotConnection')
    private readonly hoursRepository: Repository <Hours>,

    @InjectDataSource('chatbotConnection')
    private dataSource: DataSource
  ) {}


  async create(createAgendaDto: CreateAgendaDto) {

  }

  findAll() {
    return this.hoursRepository.find();
  }

  async findOne(id: number) {
    return this.hoursRepository.findOne({
      where: { id },
    });
  }

  async update(id: number, updateHoursDto: UpdateHoursDto) {
    return await this.hoursRepository.update(id,updateHoursDto);
  }

  remove(id: number) {
    return `This action removes a #${id} agenda`;
  }
}
