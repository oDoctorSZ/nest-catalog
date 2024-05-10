import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

const updateMovieBodySchema = z.object({
  title: z.string().optional(),
  releaseYear: z.number().optional(),
  synopsis: z.string().min(6).optional()
})

export class UpdateMovieDto {
  @ApiProperty()
  title: z.infer<typeof updateMovieBodySchema>['title'];

  @ApiProperty()
  releaseYear: z.infer<typeof updateMovieBodySchema>['releaseYear'];

  @ApiProperty()
  synopsis: z.infer<typeof updateMovieBodySchema>['synopsis'];
}