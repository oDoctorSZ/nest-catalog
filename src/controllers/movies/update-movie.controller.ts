import { Body, Controller, HttpCode, Patch, UseGuards, Param, NotFoundException, Inject } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Movies } from "src/database/entities/movies.entity";
import { UpdateMovieDto } from "src/dto/movies/update-movie.dto";
import { MoviesRepository } from "src/repositories/movies.repository";

@Controller()
@UseGuards(JwtAuthGuard)
export class UpdateMoviesController {
  constructor(
    @Inject('MoviesRepository') private moviesRepository: MoviesRepository
  ) {}

  @Patch('/movies/:id')
  @ApiTags('Movies')
  @ApiOperation({ summary: 'Update some movie' })
  @ApiBody({ type: UpdateMovieDto })
  @ApiParam({ name: 'id', required: true, schema: { type: 'string' } })
  @HttpCode(200)
  async handle(@Param('id') id: string, @Body() body: UpdateMovieDto): Promise<Movies> {
    const { title, releaseYear, synopsis } = body

    const movie = await this.moviesRepository.findOneBy({id: id});

    if (!movie) {
      throw new NotFoundException('Movie not found.');
    }

    if (title) {
      movie.title = title;
    }
    if (releaseYear) {
      movie.releaseYear = releaseYear;
    }
    if (synopsis) {
      movie.synopsis = synopsis;
    }

    return this.moviesRepository.save(movie);
  }
}
