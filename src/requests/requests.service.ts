import { Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Request } from './entities/request.entity';
import { RequestDetails } from './entities/request-details.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';

@Injectable()
export class RequestsService {
  constructor(
    @InjectRepository(Request,'chatbotConnection')
    private readonly requestsRepository: Repository<Request>,

    @InjectRepository(User,'chatbotConnection')
    private readonly usersRepository: Repository<User>,

    @InjectDataSource('chatbotConnection')
    private readonly dataSource,
  ) {}
  async create(createRequestDto: CreateRequestDto) {
    const user = await this.usersRepository.findOneBy({phoneNumber: createRequestDto.userPhoneNumber});
    console.log(createRequestDto);


    return await this.dataSource.transaction(async manager => {
      const {requestDetails,...requestData}= createRequestDto;

      const req = JSON.parse(JSON.stringify(requestDetails));
      console.log(req);
      const re= JSON.parse(req)
      const request = await manager.create(Request,{...requestData, userId: user?.id});
      await manager.save(request);
      for(const detail of re){
        console.log(detail);
        const requestDetail = await manager.create(RequestDetails,{...detail,requestId:request.id});
        await manager.save(requestDetail);

      }
      return this.findOne(request.id);
    });
  }

  findAll() {
    return this.requestsRepository.find({
      relations:{
        requestDetails:true,
      }
    });
  }

  findOne(id: number) {
    return this.requestsRepository.findOne({
      where:{id},
      relations:{
        requestDetails:true,
      }
    });
  }

  update(id: number, updateRequestDto: UpdateRequestDto) {
    return `This action updates a #${id} request`;
  }

  remove(id: number) {
    return `This action removes a #${id} request`;
  }
}
