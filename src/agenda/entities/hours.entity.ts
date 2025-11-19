import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Day } from "./days.entity";
import { User } from "../../users/entities/user.entity";

@Entity('hours')
export class Hours {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dayId: number;

    @Column()
    hour: string;

    @Column({default: true})
    isAvailable: boolean;

    @Column({default:null})
    userId:number

    @ManyToOne(() => Day, day => day.hours)
    day : Day

    @ManyToOne(() => User, user => user.hours)
    user: User

}