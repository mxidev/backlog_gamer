import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async create(email: string, hashedPassword: string): Promise<User> {
    const user: User = {
      id: crypto.randomUUID(),
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };
    this.users.push(user);
    return user;
  }
}