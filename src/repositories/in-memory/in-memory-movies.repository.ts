import { Injectable, NotFoundException } from '@nestjs/common';
import { Movies } from 'src/database/entities/movies.entity';
import { MoviesRepository } from '../movies.repository';
import { createClient } from 'redis-mock';

@Injectable()
export class InMemoryMoviesRepository implements MoviesRepository {
  public items: Movies[] = []
  
  async createMovie(data: Movies): Promise<Movies> {
    const { title, releaseYear, synopsis } = data

    const movie = {
      id: 'movie-1',
      title,
      releaseYear,
      synopsis
    }

    this.items.push(movie)
    return movie
  }

  async deleteMovie(movieId: string): Promise<void> {
    const movieIndex = this.items.findIndex(item => item.id === movieId);
  
    if (movieIndex === -1) {
      throw new NotFoundException('Movie not found');
    }
  
    this.items.splice(movieIndex, 1)[0];
  }

  async listMovies(): Promise<Movies[]> {
    return this.items
  }

  async updateMovie(movieId: string, data: any): Promise<Movies> {
    const movie = await this.findOneBy({ id: movieId });

    if (!movie) {
      throw new NotFoundException('Movie not found');
    }

    const updatedMovie = {
      ...movie,
      ...data,
    };

    const movieIndex = this.items.findIndex(item => item.id === movieId);
    this.items[movieIndex] = updatedMovie;

    return updatedMovie;
  }

  async findOneBy(data: any): Promise<Movies | undefined> {
    return this.items.find(movie => {
      return Object.keys(data).every(key => {
        if (key === 'id') {
          return movie.id === data[key];
        } else {
          return movie[key] === data[key];
        }
      });
    });
  }

  async save(movie: Movies): Promise<Movies> {
    const movieIndex = this.items.findIndex(item => item.id === movie.id);

    if (movieIndex === -1) {
      this.items.push(movie);
    } else {
      this.items[movieIndex] = movie;
    }

    return movie;
  }
  
}
