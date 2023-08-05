import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Beaches {

    @PrimaryGeneratedColumn()
    beach_id:number;

    @Column({ nullable: true })
    beach_name:string;

    @Column({ nullable: true }) 
    lat: string;

    @Column({ nullable: true })
    lon:string;
}