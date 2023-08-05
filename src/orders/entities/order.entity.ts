import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class orders {

@PrimaryGeneratedColumn()
order_id: number;

@Column({type: "json"})
items_purchased:any | null

@Column({ nullable: true })
purchase_date: Date;

@Column({ nullable: true })
user_id: null | number;
}