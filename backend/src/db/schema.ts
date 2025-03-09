import { sql } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const urlsTable = sqliteTable("urls_table", {
    id: int().primaryKey({autoIncrement: true}),
    shortId: text().notNull().unique(),
    longUrl: text().notNull(),
    shortUrl: text().notNull(),
    createdAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text()
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
})

export type Url = typeof urlsTable.$inferSelect
export type InsertUrl = typeof urlsTable.$inferInsert