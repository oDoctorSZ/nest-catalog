import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail, Min } from 'class-validator'

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  @IsEmail()
  email: string;

  @Column({ length: 100 })
  @Min(6)
  password: string;

}