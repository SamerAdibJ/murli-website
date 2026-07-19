import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { blessingCards, userBlessings } from '../drizzle/schema';
import { and, eq, count } from 'drizzle-orm';
import { BlessingCard, CreateBlessingDto, UpdateBlessingDto } from 'shared';

@Injectable()
export class BlessingsService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  // ─── Admin: CRUD ───────────────────────────────────────────

  async create(data: CreateBlessingDto): Promise<BlessingCard> {
    const [card] = await this.db
      .insert(blessingCards)
      .values(data as typeof blessingCards.$inferInsert)
      .returning();

    return this.toResponse(card);
  }

  async list(page: number, limit: number) {
    const [items, totalResult] = await Promise.all([
      this.db
        .select()
        .from(blessingCards)
        .orderBy(blessingCards.id)
        .offset((page - 1) * limit)
        .limit(limit),
      this.db.select({ total: count() }).from(blessingCards),
    ]);

    return {
      items: items.map((c) => this.toResponse(c)),
      total: totalResult[0]?.total ?? 0,
      page,
      limit,
    };
  }

  async update(id: number, data: UpdateBlessingDto): Promise<BlessingCard> {
    const [card] = await this.db
      .update(blessingCards)
      .set({
        ...data,
        updatedAt: new Date(),
      } as typeof blessingCards.$inferInsert)
      .where(eq(blessingCards.id, id))
      .returning();

    if (!card) {
      throw new NotFoundException(`Blessing card with id ${id} not found`);
    }

    return this.toResponse(card);
  }

  async delete(id: number): Promise<void> {
    const [card] = await this.db
      .delete(blessingCards)
      .where(eq(blessingCards.id, id))
      .returning({ id: blessingCards.id });

    if (!card) {
      throw new NotFoundException(`Blessing card with id ${id} not found`);
    }
  }

  // ─── User: daily random ────────────────────────────────────

  async getTodayBlessing(userId: string): Promise<BlessingCard> {
    const today = new Date().toISOString().split('T')[0];

    // Check if already assigned today
    const [existing] = await this.db
      .select()
      .from(userBlessings)
      .where(
        and(
          eq(userBlessings.userId, userId),
          eq(userBlessings.assignedDate, today),
        ),
      );

    if (existing) {
      const [card] = await this.db
        .select()
        .from(blessingCards)
        .where(eq(blessingCards.id, existing.blessingCardId));

      if (!card) {
        throw new NotFoundException('Assigned blessing card not found');
      }

      return this.toResponse(card);
    }

    // Pick a random published blessing
    const cards = await this.db
      .select()
      .from(blessingCards)
      .where(eq(blessingCards.published, true));

    if (cards.length === 0) {
      throw new NotFoundException('No published blessing cards available');
    }

    const random = cards[Math.floor(Math.random() * cards.length)];

    // Assign it
    await this.db.insert(userBlessings).values({
      userId,
      blessingCardId: random.id,
      assignedDate: today,
    });

    return this.toResponse(random);
  }

  // ─── User: blessing history ────────────────────────────────

  async getHistory(userId: string): Promise<BlessingCard[]> {
    const rows = await this.db
      .select()
      .from(userBlessings)
      .where(eq(userBlessings.userId, userId))
      .orderBy(userBlessings.assignedDate);

    if (rows.length === 0) return [];

    const cards = await this.db.select().from(blessingCards);

    const cardMap = new Map(cards.map((c) => [c.id, c]));

    return rows
      .map((r) => {
        const card = cardMap.get(r.blessingCardId);
        return card ? this.toResponse(card) : null;
      })
      .filter((c): c is BlessingCard => c !== null);
  }

  // ─── Helpers ───────────────────────────────────────────────

  private toResponse(row: typeof blessingCards.$inferSelect): BlessingCard {
    return {
      id: row.id,
      contentAr: row.contentAr,
      contentEn: row.contentEn,
      theme: row.theme ?? null,
      published: row.published ?? false,
      createdBy: row.createdBy ?? null,
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : '',
      updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : '',
    };
  }
}
