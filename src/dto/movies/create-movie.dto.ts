import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

const createMovieBodySchema = z.object({
  title: z.string(),
  releaseYear: z.number(),
  synopsis: z.string().min(6)
})

export class CreateMovieDto {
  @ApiProperty()
  title: z.infer<typeof createMovieBodySchema>['title'];

  @ApiProperty()
  releaseYear: z.infer<typeof createMovieBodySchema>['releaseYear'];

  @ApiProperty()
  synopsis: z.infer<typeof createMovieBodySchema>['synopsis'];
}