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

@Module({
  providers: [AgendaService],

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
          User
        ]
    }),
    TypeOrmModule.forFeature([
        Agenda,
        Request
      ] , 'chatbotConnection' ),
  Agenda,
  Request
],
  controllers: [
    ...AgendaControllers,
  ],
})
export class AppModule {}
