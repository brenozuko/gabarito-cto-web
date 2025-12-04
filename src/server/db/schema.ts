// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, sqliteTableCreator } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator(
  (name) => `gabarito-cto-web_${name}`,
);

export const trails = createTable(
  "trail",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    name: d.text({ length: 256 }).notNull(),
    description: d.text(),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [index("trail_name_idx").on(t.name)],
);

export const items = createTable(
  "item",
  (d) => ({
    id: d.integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
    trailId: d.integer({ mode: "number" }).notNull(),
    name: d.text({ length: 256 }).notNull(),
    description: d.text(),
    xp: d.integer({ mode: "number" }).notNull().default(10),
    completed: d.integer({ mode: "boolean" }).notNull().default(false),
    order: d.integer({ mode: "number" }).notNull().default(0),
    createdAt: d
      .integer({ mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: d.integer({ mode: "timestamp" }).$onUpdate(() => new Date()),
  }),
  (t) => [
    index("trail_id_idx").on(t.trailId),
    index("order_idx").on(t.trailId, t.order),
  ],
);

export const trailsRelations = relations(trails, ({ many }) => ({
  items: many(items),
}));

export const itemsRelations = relations(items, ({ one }) => ({
  trail: one(trails, {
    fields: [items.trailId],
    references: [trails.id],
  }),
}));
