import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { bookmarks } from '../drizzle/schema';
import { and, eq } from 'drizzle-orm';
import { Bookmark, CreateBookmarkDto } from 'shared';

@Injectable()
export class BookmarksService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async create(data: CreateBookmarkDto): Promise<Bookmark> {
    const [bookmark] = await this.db
      .insert(bookmarks)
      .values(data as typeof bookmarks.$inferInsert)
      .returning();

    return this.toResponse(bookmark);
  }

  async list(userId: string): Promise<Bookmark[]> {
    const rows = await this.db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId))
      .orderBy(bookmarks.createdAt);

    return rows.map((b) => this.toResponse(b));
  }

  async remove(userId: string, murliId: number): Promise<void> {
    const [bookmark] = await this.db
      .delete(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.murliId, murliId)))
      .returning({ id: bookmarks.id });

    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
  }

  private toResponse(row: typeof bookmarks.$inferSelect): Bookmark {
    return {
      id: row.id,
      userId: row.userId,
      murliId: row.murliId,
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : '',
    };
  }
}
