import { z } from 'zod';
import { ApiProperty } from '@nestjs/swagger';

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

export class AuthenticateAccountDto {
  @ApiProperty()
  email: z.infer<typeof authenticateBodySchema>['email'];

  @ApiProperty()
  password: z.infer<typeof authenticateBodySchema>['password'];
}