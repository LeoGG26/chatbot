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


@Injectable()
export class AgendaService {

  constructor(
    @InjectRepository(Agenda,'chatbotConnection')
    private readonly agendaRepository: Repository <Agenda>,

    @InjectDataSource('chatbotConnection')
    private dataSource: DataSource
  ) {}


  async create(createAgendaDto: CreateAgendaDto) {
    return this.dataSource.transaction(async manager => {
      const {days,...agendaData}= createAgendaDto
      const agenda = await manager.create(Agenda,agendaData)
      await manager.save(agenda);

      for (const day of days) {
        const {hours,...daydata} = day
        const newday = manager.create(Day, {...daydata, agendaId: agenda.id});
        await manager.save(newday);

        for (const hour of hours){
          const newHour = manager.create(Hours, {...hour, dayId: newday.id});
          await manager.save(newHour)
        }
      }

      return this.findOne(agenda.id);
    });
  }

  findAll() {
    return this.agendaRepository.find();
  }

  async findOne(id: number) {
    return this.agendaRepository.findOne({
      where: { id },
      relations: ['days.hours'],
    });
  }

  update(id: number, updateAgendaDto: UpdateAgendaDto) {
    return `This action updates a #${id} agenda`;
  }

  remove(id: number) {
    return `This action removes a #${id} agenda`;
  }
}
