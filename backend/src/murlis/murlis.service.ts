import { Injectable } from '@nestjs/common';
import { DrizzleService } from '../drizzle/drizzle.service';
import { murlis } from '../drizzle/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class MurlisService {
  constructor(private drizzleService: DrizzleService) {}

  async getTodayMurli() {
    const today = new Date().toISOString().split('T')[0];
    const [murli] = await this.drizzleService.db
      .select()
      .from(murlis)
      .where(eq(murlis.date, today));

    return murli || { message: `No Murli found for today (${today})` };
  }
}
