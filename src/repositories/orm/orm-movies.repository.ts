import { Injectable } from '@nestjs/common';
import { Movies } from 'src/database/entities/movies.entity';
import { DataSource, Repository } from 'typeorm';
import { MoviesRepository } from '../movies.repository';

@Injectable()
export class OrmMoviesRepository extends Repository<Movies> implements MoviesRepository {
  constructor(private dataSource: DataSource) {
    super(Movies, dataSource.createEntityManager());
  }

  createMovie({title, releaseYear, synopsis} : any) : Promise<Movies> {
    return this.save({ title, releaseYear, synopsis })
  }

  async deleteMovie(movieId: string): Promise<void> {
    this.findOne({where: {id: movieId}}).then(movie => this.remove(movie));
  }

  async listMovies(): Promise<Movies[]> {
    return this.find();
  }

  async updateMovie(movieId: string, data: any): Promise<Movies> {
    return this.findOne({where: {id: movieId}}).then(movie => this.save({ ...movie, ...data }));
  }
}
