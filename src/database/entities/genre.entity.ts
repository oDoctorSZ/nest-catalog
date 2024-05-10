import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Movies } from './movies.entity';

@Entity()
export class Genre {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToMany(() => Movies)
    movies: Movies[];
}