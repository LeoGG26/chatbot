import { Injectable } from '@nestjs/common';
import { CreateAgendaDto } from '../dto/create-agenda.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hours } from '../entities/hours.entity';
import { Day } from '../entities/days.entity';
import { UpdateHoursDto } from '../dto/update-hours.dto';
import { User } from '../../users/entities/user.entity';


@Injectable()
export class HoursService {

  constructor(
    @InjectRepository(Hours,'chatbotConnection')
    private readonly hoursRepository: Repository <Hours>,

    @InjectRepository(User,'chatbotConnection')
    private readonly userRepository: Repository<User>,

    @InjectRepository(Day,'chatbotConnection')
    private readonly dayRepository: Repository <Day>,

    // @InjectDataSource('chatbotConnection')
    // private dataSource: DataSource
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
    const userId = updateHoursDto.userId;
    return await this.hoursRepository.update(id,{userId, isAvailable: false});
  }

  async reserve(id: number, phoneNumber: string) {
    const user = await this.userRepository.findOne({
      where: { phoneNumber },
    });
    if(!user){
      throw new Error('User not found');
    }

    await this.hoursRepository.update(id,{userId: user.id, isAvailable: false});

    return this.findOne(id);


  }



  remove(id: number) {
    return `This action removes a #${id} agenda`;
  }

  async findAvailableHoursByDay(day: number) {

    const res= await this.dayRepository.findOne({
      where: { day },
      relations: ['hours'],
    });
    if(!res){
      return [];
    }
    //console.log(res)

    const availableHours = res.hours.filter(hour => hour.isAvailable);

    return availableHours;

  }
}
