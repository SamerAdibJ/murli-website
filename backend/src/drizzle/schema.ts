import {
  pgTable,
  pgEnum,
  serial,
  integer,
  varchar,
  text,
  date,
  boolean,
  timestamp,
  unique,
} from 'drizzle-orm/pg-core';

export const murliTypeEnum = pgEnum('murli_type', ['morning', 'avyakt']);

export const murlis = pgTable('murlis', {
  id: serial('id').primaryKey(),
  date: date('date').notNull().unique(),
  type: murliTypeEnum('type').notNull().default('morning'),
  titleEn: varchar('title_en', { length: 500 }),
  titleAr: varchar('title_ar', { length: 500 }),
  essenceAr: text('essence_ar'),
  essenceEn: text('essence_en'),
  questionAr: text('question_ar'),
  questionEn: text('question_en'),
  answerAr: text('answer_ar'),
  answerEn: text('answer_en'),
  mainContentAr: text('main_content_ar'),
  mainContentEn: text('main_content_en'),
  essenceForDharnaAr: text('essence_for_dharna_ar'),
  essenceForDharnaEn: text('essence_for_dharna_en'),
  blessingAr: text('blessing_ar'),
  blessingEn: text('blessing_en'),
  sloganAr: text('slogan_ar'),
  sloganEn: text('slogan_en'),
  avyaktSignalAr: text('avyakt_signal_ar'),
  avyaktSignalEn: text('avyakt_signal_en'),
  songTitle: varchar('song_title', { length: 300 }),
  songUrl: varchar('song_url', { length: 500 }),
  published: boolean('published').default(false),
  createdBy: text('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const blessingCards = pgTable('blessing_cards', {
  id: serial('id').primaryKey(),
  contentAr: text('content_ar').notNull(),
  contentEn: text('content_en').notNull(),
  theme: varchar('theme', { length: 100 }),
  published: boolean('published').default(false),
  createdBy: text('created_by'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const userBlessings = pgTable(
  'user_blessings',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    blessingCardId: integer('blessing_card_id')
      .notNull()
      .references(() => blessingCards.id),
    assignedDate: date('assigned_date').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    uniqueUserDate: unique().on(table.userId, table.assignedDate),
  }),
);

export const bookmarks = pgTable(
  'bookmarks',
  {
    id: serial('id').primaryKey(),
    userId: text('user_id').notNull(),
    murliId: integer('murli_id')
      .notNull()
      .references(() => murlis.id),
    createdAt: timestamp('created_at').defaultNow(),
  },
  (table) => ({
    uniqueUserMurli: unique().on(table.userId, table.murliId),
  }),
);
