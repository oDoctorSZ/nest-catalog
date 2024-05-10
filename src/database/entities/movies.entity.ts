import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Movies {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    title: string;

    @Column()
    releaseYear: number;

    @Column()
    synopsis: string;
}


