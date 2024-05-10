import { ConflictException, Controller, Get, HttpCode, Inject, UseGuards } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Movies } from "src/database/entities/movies.entity";
import { MoviesRepository } from "src/repositories/movies.repository";

@Controller()
@UseGuards(JwtAuthGuard)
export class ListMoviesController {
  constructor(
    @Inject('MoviesRepository') private moviesRepository: MoviesRepository
  ) {}

  @Get('/movies')
  @ApiTags('Movies')
  @ApiOperation({ summary: 'Return the Catalog of Movies' })
  @HttpCode(200)
  async handle(): Promise<Movies[]> {
    let allMoviesListed : Movies[];

    try {
      allMoviesListed = await this.moviesRepository.listMovies()
    } catch(err) {
      console.error('Failed to catalog movies : ', err)
      return []
    }

    return allMoviesListed
  }
}
