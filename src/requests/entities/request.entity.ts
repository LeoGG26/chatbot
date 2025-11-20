import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { RequestDetails } from "./request-details.entity";
import * as request from 'supertest';

@Entity('requests')
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    requestType: string;

    @Column()
    description: string;

    @Column()
    userId: number;

    @ManyToOne(() => User, user => user.requests)
    user: User;

    @OneToMany(()=>RequestDetails,requestDetails=> requestDetails.request)
    requestDetails: RequestDetails[]


}
