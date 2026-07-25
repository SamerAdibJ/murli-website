import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { users } from '../drizzle/schema';
import { eq, count } from 'drizzle-orm';
import { User } from 'shared';

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async findById(id: string): Promise<User | null> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));

    return user ? this.toResponse(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user ? this.toResponse(user) : null;
  }

  async findRawByEmail(email: string) {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email));

    return user ?? null;
  }

  async create(data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    passwordHash: string;
  }): Promise<User> {
    const [user] = await this.db.insert(users).values(data).returning();

    return this.toResponse(user);
  }

  async updateStatus(
    id: string,
    status: 'pending' | 'active' | 'rejected',
  ): Promise<User | null> {
    const [user] = await this.db
      .update(users)
      .set({ status, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return user ? this.toResponse(user) : null;
  }

  async updateRole(id: string, role: 'member' | 'admin'): Promise<User | null> {
    const [user] = await this.db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return user ? this.toResponse(user) : null;
  }

  async listPending(): Promise<User[]> {
    const rows = await this.db
      .select()
      .from(users)
      .where(eq(users.status, 'pending'))
      .orderBy(users.createdAt);

    return rows.map((u) => this.toResponse(u));
  }

  async listAll(page: number, limit: number) {
    const [items, totalResult] = await Promise.all([
      this.db
        .select()
        .from(users)
        .orderBy(users.createdAt)
        .offset((page - 1) * limit)
        .limit(limit),
      this.db.select({ total: count() }).from(users),
    ]);

    return {
      items: items.map((u) => this.toResponse(u)),
      total: totalResult[0]?.total ?? 0,
      page,
      limit,
    };
  }

  private toResponse(row: typeof users.$inferSelect): User {
    return {
      id: row.id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      country: row.country,
      role: row.role,
      status: row.status,
      emailVerified: row.emailVerified,
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : '',
      updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : '',
    };
  }
}
