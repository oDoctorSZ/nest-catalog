import { Body, Controller, Inject, Post, UnauthorizedException, UsePipes } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { compare } from "bcryptjs";
import { AuthenticateAccountDto } from "src/dto/authenticate.dto";
import { ZodValidationPipe } from "src/pipes/zod-validation-pipe";
import { UsersRepository } from "src/repositories/users.repository";
import { z } from "zod";

interface AuthenticateResponseInterface {
  access_token: string
}

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
})

@Controller()
export class AuthenticateController {
  constructor(
    @Inject('UsersRepository') private usersRepository: UsersRepository,
    private jwt: JwtService
  ) {}

  @ApiTags('Authentication')
  @Post('/sessions')
  @ApiOperation({ summary: 'Authenticate Account' })
  @ApiBody({ type: AuthenticateAccountDto })
  @UsePipes(new ZodValidationPipe(authenticateBodySchema))
  async handle(@Body() body: AuthenticateAccountDto): Promise<AuthenticateResponseInterface> {

    const { email, password } = body

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new UnauthorizedException("Users credentials do not match.");
    }

    const isPasswordValid = await compare(password, user.password)

    if (!isPasswordValid) {
      throw new UnauthorizedException("Users credentials do not match.");
    }

    const accessToken = this.jwt.sign({ sub: user.id })

    return { access_token: accessToken }
  }
}
