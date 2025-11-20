import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Request } from "./request.entity";


@Entity('request_details')
export class RequestDetails {   
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    detail:string;

    @Column()
    requestId: number;

    @ManyToOne(()=> Request, request => request.requestDetails)
    request:Request
    // Define columns and relationships as needed
}