import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

const createAccountBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6)
});

export class CreateAccountDto {
  @ApiProperty()
  name: z.infer<typeof createAccountBodySchema>['name'];

  @ApiProperty()
  email: z.infer<typeof createAccountBodySchema>['email'];

  @ApiProperty()
  password: z.infer<typeof createAccountBodySchema>['password'];
}