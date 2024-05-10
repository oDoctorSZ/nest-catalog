import { Injectable } from '@nestjs/common';
import { createClient, RedisClient } from 'redis-mock';
import { promisify } from 'util';
import { UsersRepository } from '../users.repository';

@Injectable()
export class InMemoryUsersRepository implements UsersRepository {
  private client: RedisClient;
  private usersListKey = 'users';

  constructor() {
    this.client = createClient();
  }

  async createUser({ name, email, password }: any): Promise<any> {
    const userId = (await this.generateUserId()).toString();
    const userKey = `user:${userId}`;
    this.client.hmset(userKey, 'id', userId, 'name', name, 'email', email, 'password', password);
    this.client.rpush(this.usersListKey, userKey);
    return { id: userId, name, email, password };
  }

  async findOneBy(query: any): Promise<any | null> {
    return new Promise((resolve, reject) => {
      this.client.lrange(this.usersListKey, 0, -1, (err, userList) => {
        if (err) {
          reject(err);
        } else {
          for (const userKey of userList) {
            const user: any = this.client.hgetall(userKey);
            if (user && typeof user === 'object' && 'email' in user && user.email === query.email) {
              resolve(user);
              return;
            }
          }
          resolve(null);
        }
      });
    });
  }

  async findByEmail(email: string): Promise<any | false> {
    return new Promise((resolve, reject) => {
      this.client.lrange(this.usersListKey, 0, -1, (err, userList) => {
        if (err) {
          reject(err);
          return;
        }
  
        const promises = userList.map(userKey => {
          return new Promise((innerResolve, innerReject) => {
            this.client.hgetall(userKey, (err, user) => {
              if (err) {
                innerReject(err);
              } else {
                innerResolve(user);
              }
            });
          });
        });
  
        Promise.all(promises)
          .then(users => {
            const foundUser = users.find(user => user && typeof user === 'object' && 'email' in user && user.email === email);
            resolve(foundUser || false);
          })
          .catch(error => {
            reject(error);
          });
      });
    });
  }
  
  
  
  private async generateUserId(): Promise<number> {
    const incrAsync = promisify(this.client.incr).bind(this.client);
    return await incrAsync('user_id');
  }
}
