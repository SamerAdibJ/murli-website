import {
  pgTable,
  serial,
  varchar,
  text,
  date,
  boolean,
  timestamp,
} from 'drizzle-orm/pg-core';

export const murlis = pgTable('murlis', {
  id: serial('id').primaryKey(),
  date: date('date').notNull().unique(),
  titleAr: varchar('title_ar', { length: 500 }).notNull(),
  contentAr: text('content_ar').notNull(),
  published: boolean('published').default(false),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});
