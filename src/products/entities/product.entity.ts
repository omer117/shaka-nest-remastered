import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    product_id: number

    @Column()
    catagory: string;

    @Column()
    title: string;

    @Column()
    price: number;

    @Column()
    info: string;

    @Column
        ({
            type: 'text',
            array: true,
            default: []
        })
    sizes: string[];

    @Column()
    image: string;
}
