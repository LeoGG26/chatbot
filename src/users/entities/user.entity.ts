import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hours } from "../../agenda/entities/hours.entity";
import { Request } from "../../requests/entities/request.entity";

@Entity('users')
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    phoneNumber: string;

    @OneToMany(()=>Hours,hours=>hours.user)
    hours: Hours

    @OneToMany(()=> Request, request => request.user)
    requests: Request[];
}
