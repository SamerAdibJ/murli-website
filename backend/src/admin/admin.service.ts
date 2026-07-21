import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from 'shared';

@Injectable()
export class AdminService {
  constructor(private readonly usersService: UsersService) {}

  async listPendingUsers(): Promise<User[]> {
    return this.usersService.listPending();
  }

  async listUsers(page: number, limit: number) {
    return this.usersService.listAll(page, limit);
  }

  async approveUser(id: string): Promise<User> {
    const user = await this.usersService.updateStatus(id, 'active');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async rejectUser(id: string): Promise<User> {
    const user = await this.usersService.updateStatus(id, 'rejected');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async promoteUser(id: string): Promise<User> {
    const user = await this.usersService.updateRole(id, 'admin');

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
