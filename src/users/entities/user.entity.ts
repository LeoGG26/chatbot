import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Hours } from "../../agenda/entities/hours.entity";

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
}
