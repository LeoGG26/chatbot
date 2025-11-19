import { Column, ManyToOne, OneToMany } from "typeorm";
import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { Agenda } from "./agenda.entity";
import { Hours } from "./hours.entity";
@Entity('days')
export class Day {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    day: number;

    @Column()
    agendaId: number;

    @ManyToOne(() => Agenda, agenda => agenda.days)
    agenda: Agenda;

    @OneToMany(()=> Hours, hours=> hours.day)
    hours: Hours[]

}