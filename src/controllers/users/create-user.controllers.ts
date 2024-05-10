import { Body, ConflictException, Controller, HttpCode, Inject, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { hash } from "bcryptjs";
import { CreateAccountDto } from "src/dto/create-user.dto";
import { UsersRepository } from "src/repositories/users.repository";

interface CreateAccountInterface {
  id?: string,
  name: string,
  email: string,
  password: string,
}

@Controller()
export class UsersController {
  constructor(
  @Inject('UsersRepository') private usersRepository: UsersRepository
  ) {}

  @ApiTags('Accounts')
  @Post('/accounts')
  @ApiOperation({ summary: 'Create new account' })
  @ApiBody({ type: CreateAccountDto })
  @HttpCode(201)
  async handle(@Body() body: CreateAccountDto): Promise<CreateAccountInterface> {
    const { name, email, password } = body

    const isEmailAlreadyRegistered = await this.usersRepository.findByEmail(email)

    if (isEmailAlreadyRegistered) {
      throw new ConflictException('User with same email already exists.')
    }

    const hashedPassword = await hash(password, 8)

    return await this.usersRepository.createUser({ 
      name, 
      email, 
      password: hashedPassword 
    })
  }
}
