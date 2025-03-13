import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:Number;

    @Column({ length: 100 })
    name:string;

    @Column({ length: 100 })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    ConfirmPassword: string;
}