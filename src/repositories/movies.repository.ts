import { Movies } from "src/database/entities/movies.entity";

export interface MoviesRepository {
  createMovie(data: any) : Promise<Movies>;
  deleteMovie(movieId: string) : Promise<void>;
  listMovies() : Promise<Movies[]>;
  updateMovie(movieId: string, data: any) : Promise<Movies>;
  findOneBy(data: any) : Promise<Movies>;
  save(movie: Movies) : Promise<Movies>;
}