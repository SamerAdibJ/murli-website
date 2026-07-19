import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DRIZZLE } from '../drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';
import { murlis } from '../drizzle/schema';
import { and, eq, gte, lte, desc, count } from 'drizzle-orm';
import {
  CreateMurliDto,
  MurliResponse,
  PaginatedResponse,
  UpdateMurliDto,
} from 'shared';

@Injectable()
export class MurlisService {
  constructor(@Inject(DRIZZLE) private db: NodePgDatabase<typeof schema>) {}

  async getTodayMurli(): Promise<MurliResponse> {
    const today = new Date().toISOString().split('T')[0];
    return this.getMurliByDate(today);
  }

  async getMurliByDate(date: string): Promise<MurliResponse> {
    const [murli] = await this.db
      .select()
      .from(murlis)
      .where(eq(murlis.date, date));

    if (!murli) {
      throw new NotFoundException(`No Murli found for ${date}`);
    }

    return this.toResponse(murli);
  }

  async updateMurli(id: number, data: UpdateMurliDto): Promise<MurliResponse> {
    const [murli] = await this.db
      .update(murlis)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(murlis.id, id))
      .returning();

    if (!murli) {
      throw new NotFoundException(`Murli with id ${id} not found`);
    }

    return this.toResponse(murli);
  }

  async listMurlis(
    page: number,
    limit: number,
    from?: string,
    to?: string,
  ): Promise<PaginatedResponse<MurliResponse>> {
    const conditions: ReturnType<typeof gte>[] = [];
    if (from) conditions.push(gte(murlis.date, from));
    if (to) conditions.push(lte(murlis.date, to));

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    const [items, totalResult] = await Promise.all([
      this.db
        .select()
        .from(murlis)
        .where(where)
        .orderBy(desc(murlis.date))
        .offset((page - 1) * limit)
        .limit(limit),
      this.db.select({ total: count() }).from(murlis).where(where),
    ]);

    return {
      items: items.map((m) => this.toResponse(m)),
      total: totalResult[0]?.total ?? 0,
      page,
      limit,
    };
  }

  async createMurli(data: CreateMurliDto): Promise<MurliResponse> {
    const [murli] = await this.db
      .insert(murlis)
      .values(data as typeof murlis.$inferInsert)
      .returning();

    return this.toResponse(murli);
  }

  async deleteMurli(id: number): Promise<void> {
    const [murli] = await this.db
      .delete(murlis)
      .where(eq(murlis.id, id))
      .returning({ id: murlis.id });

    if (!murli) {
      throw new NotFoundException(`Murli with id ${id} not found`);
    }
  }

  private toResponse(row: typeof murlis.$inferSelect): MurliResponse {
    return {
      id: row.id,
      date: row.date,
      type: row.type,
      titleEn: row.titleEn ?? null,
      titleAr: row.titleAr ?? null,
      essenceAr: row.essenceAr ?? null,
      essenceEn: row.essenceEn ?? null,
      questionAr: row.questionAr ?? null,
      questionEn: row.questionEn ?? null,
      answerAr: row.answerAr ?? null,
      answerEn: row.answerEn ?? null,
      mainContentAr: row.mainContentAr ?? null,
      mainContentEn: row.mainContentEn ?? null,
      essenceForDharnaAr: row.essenceForDharnaAr ?? null,
      essenceForDharnaEn: row.essenceForDharnaEn ?? null,
      blessingAr: row.blessingAr ?? null,
      blessingEn: row.blessingEn ?? null,
      sloganAr: row.sloganAr ?? null,
      sloganEn: row.sloganEn ?? null,
      avyaktSignalAr: row.avyaktSignalAr ?? null,
      avyaktSignalEn: row.avyaktSignalEn ?? null,
      songTitle: row.songTitle ?? null,
      songUrl: row.songUrl ?? null,
      published: row.published ?? false,
      createdBy: row.createdBy ?? null,
      createdAt: row.createdAt ? new Date(row.createdAt).toISOString() : '',
      updatedAt: row.updatedAt ? new Date(row.updatedAt).toISOString() : '',
    };
  }
}
