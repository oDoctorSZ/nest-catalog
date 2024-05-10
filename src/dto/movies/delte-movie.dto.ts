import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

const deleteMovieBodySchema = z.object({
  title: z.string(),
})

export class DeleteMovieDto {
  @ApiProperty()
  title: z.infer<typeof deleteMovieBodySchema>['title'];
}