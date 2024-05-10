import { CreateMoviesController } from "src/controllers/movies/create-movie.controller";
import { DeleteMoviesController } from "src/controllers/movies/delete-movie.controller";
import { ListMoviesController } from "src/controllers/movies/list-movie.controller";
import { UpdateMoviesController } from "src/controllers/movies/update-movie.controller";
import { Movies } from "src/database/entities/movies.entity";
import { InMemoryMoviesRepository } from "src/repositories/in-memory/in-memory-movies.repository";
import { beforeEach, describe, it, expect } from "vitest";

describe('Movies use case', async () => {
  let moviesRepository: InMemoryMoviesRepository = new InMemoryMoviesRepository();

  it('should be able to create a movie', async () => {
    let sut: CreateMoviesController = new CreateMoviesController(moviesRepository)

    const movie = await sut.handle(
      {
        title: 'asd',
        releaseYear: 2004,
        synopsis: 'aoijisnd',
      }
    )

    expect(movie.id).toEqual(expect.any(String))
  });

  
  it('should be able to list movies', async () => {
    let sut: ListMoviesController = new ListMoviesController(moviesRepository)
    
    const movies : Movies[] = await sut.handle()

    expect(movies[0]).toHaveProperty('id');
  });

  it('should be able to update a movie', async () => {
    const createMoviesController = new CreateMoviesController(moviesRepository);
    const updateMoviesController = new UpdateMoviesController(moviesRepository);

    const createdMovie = await createMoviesController.handle({
      title: 'Test Movie',
      releaseYear: 2022,
      synopsis: 'Test Synopsis',
    });

    const sut = await updateMoviesController.handle(createdMovie.id, {
      title: 'Updated Movie',
      releaseYear: 2023,
      synopsis: 'Updated Synopsis',
    });

    // Assert
    expect(sut.id).toEqual(createdMovie.id)
    expect(sut.title).toEqual('Updated Movie')
  });

  it('should be able to delete a movie', async () => {
    let sut: DeleteMoviesController = new DeleteMoviesController(moviesRepository)

    const movie = await sut.handle(
      {
        title: 'Updated Movie',
      }
    )

    expect(movie.id).toEqual(expect.any(String))
  });




});

