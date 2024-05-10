import { Body, ConflictException, Controller, Get, HttpCode, Inject, Post, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreateMovieDto } from "src/dto/movies/create-movie.dto";
import { MoviesRepository } from "src/repositories/movies.repository";

@Controller()
@UseGuards(JwtAuthGuard)
export class CreateMoviesController {
  constructor(
    @Inject('MoviesRepository') private moviesRepository: MoviesRepository
  ) {}

  @Post('/movies')
  @ApiTags('Movies')
  @ApiOperation({ summary: 'Create new movie' })
  @ApiBody({ type: CreateMovieDto })
  @HttpCode(201)
  async handle(@Body() body: CreateMovieDto): Promise<any> {
    const { title, releaseYear, synopsis } = body

    const isTitleAlreadyRegistered = await this.moviesRepository.findOneBy({ title: title })

    if (isTitleAlreadyRegistered) {
      throw new ConflictException('A Movie with same title already exists.')
    }

    const createdMovie = await this.moviesRepository.createMovie({ 
      title, 
      releaseYear, 
      synopsis
    })

    return createdMovie
  }
}
