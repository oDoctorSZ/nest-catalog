import { Body, ConflictException, Controller, Delete, HttpCode, Inject, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { DeleteMovieDto } from "src/dto/movies/delte-movie.dto";
import { MoviesRepository } from "src/repositories/movies.repository";



@Controller()
@UseGuards(JwtAuthGuard)
export class DeleteMoviesController {
  constructor(
    @Inject('MoviesRepository') private moviesRepository: MoviesRepository
  ) {}

  @Delete('/movies')
  @ApiTags('Movies')
  @ApiOperation({ summary: 'Delete movie' })
  @ApiBody({ type: DeleteMovieDto })
  @HttpCode(204)
  async handle(@Body() body: DeleteMovieDto): Promise<any> {
    const { title } = body

    const isTitleRegistered = await this.moviesRepository.findOneBy({ title })

    if (!isTitleRegistered) {
      throw new ConflictException('A Movie with this title do not exists.')
    }

    const foundedMovie = await this.moviesRepository.findOneBy({ title })
    await this.moviesRepository.deleteMovie(foundedMovie.id)

    return foundedMovie
  }
}
