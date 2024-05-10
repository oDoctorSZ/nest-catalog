import { Users } from "src/database/entities/users.entity";

export interface UsersRepository {
  createUser(data: any) : Promise<Users>;
  findOneBy(data: any) : Promise<any>;
  findByEmail(email: string) : Promise<Users>
}