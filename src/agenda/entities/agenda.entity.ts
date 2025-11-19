import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Day } from './days.entity';

@Entity('agenda')
export class Agenda {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    year: number;

    @Column()
    month: number;


    @OneToMany(() => Day, day => day.agenda, { cascade: true })
    days: Day[];
}
