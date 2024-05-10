import { Injectable } from '@nestjs/common';
import { Users } from 'src/database/entities/users.entity';
import { DataSource, Repository } from 'typeorm';
import { UsersRepository } from '../users.repository';

@Injectable()
export class OrmUsersRepository extends Repository<Users> implements UsersRepository {
  constructor(private dataSource: DataSource) {
    super(Users, dataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<Users | null> {
    return await this.findOneBy({ email });
  }

  async createUser({ name, email, password }: any): Promise<Users> {
    const user = this.create({ name, email, password });
    return this.save(user);
  }
}
