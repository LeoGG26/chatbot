import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { RequestsModule } from './requests/requests.module';
import { Agenda } from './agenda/entities/agenda.entity';
import { Request } from './requests/entities/request.entity';
import { AgendaService } from './agenda/services/agenda.service';

import { agendaEntities } from './agenda/entities/agendaentities.index';
import { AgendaControllers } from './agenda/controllers/agenda-controllers.index';
import { User } from './users/entities/user.entity';
import { RequestDetails } from './requests/entities/request-details.entity';
import { agendaServices } from './agenda/services/agenda-services.index';
import { UsersService } from './users/users.service';
import { RequestsService } from './requests/requests.service';
import { UsersController } from './users/users.controller';
import { RequestsController } from './requests/requests.controller';
import { HoursService } from './agenda/services/hours.service';
import { Hours } from './agenda/entities/hours.entity';
import { Day } from './agenda/entities/days.entity';
import { AgendaController } from './agenda/controllers/agenda.controller';
import { HoursController } from './agenda/controllers/hours.controller';

@Module({
  providers: [AgendaService,HoursService,UsersService,RequestsService],

  imports: [ConfigModule.forRoot({ isGlobal: true }),
  TypeOrmModule.forRoot({
      name:'chatbotConnection',
      type: 'mysql',               // o postgres
      //host: process.env.DB_HOST,
      host:'localhost',
      port: 3306,//+process.env.DB_PORT,
      username: 'root',//process.env.DB_USER,
      password:'admin',// process.env.DB_PASS,
      database: 'chatbot_db',//process.env.DB_NAME,
      //autoLoadEntities: true,      // carga automática de entidades
      synchronize: true,           // ⚠️ solo en desarrollo
      dropSchema: true,  // 🚨 cuidado: borra y recrea todo el schema
      logging: true,
      extra: {
          charset: "utf8_unicode_ci"
        },
        entities: [
          ...agendaEntities,
          Request,
          RequestDetails,
          User
        ]
    }),
    TypeOrmModule.forFeature([
        Agenda,
        Day,
        Hours,
        User,
        Request,
        RequestDetails,
      ] , 'chatbotConnection' ),
  Agenda,
  Request
],
  controllers: [
    ...AgendaControllers,
    AgendaController,
    HoursController,
    UsersController,
    RequestsController,

  ],
})
export class AppModule {}
