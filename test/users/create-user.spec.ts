import { UsersController } from "src/controllers/users/create-user.controllers";
import { InMemoryUsersRepository } from "src/repositories/in-memory/in-memory-users.repository";
import { beforeEach, describe, it, expect } from "vitest";

describe('Users case', async () => {
  let usersRepository: InMemoryUsersRepository;
  let sut: UsersController;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new UsersController(usersRepository)
  });

  it('should be able to create account', async () => {
    const user = await sut.handle(
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456'
      }
    )

    expect(user.id).toEqual(expect.any(String))
  });
});

