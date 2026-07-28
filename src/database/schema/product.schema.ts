// src/database/schema/product.schema.ts
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";
import { users } from "./user.schema";

export const products = sqliteTable("products", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  name: text("name").notNull(),
  code: text("code").notNull().unique(),
  description: text("description"),
  category: text("category").notNull(),

  image: text("image"),

  quantityPerCarton: integer("quantity_per_carton").notNull(),
  salePrice: integer("sale_price").notNull(),

  totalCartons: integer("total_cartons").default(0).notNull(),
  totalExtraPieces: integer("total_extra_pieces").default(0).notNull(),
  totalQuantity: integer("total_quantity").default(0).notNull(),

  // enum becomes text — validate the allowed values in your TS code/Zod schema instead
  stockStatus: text("stock_status", {
    enum: ["in_stock", "low_stock", "out_of_stock"],
  })
    .default("out_of_stock")
    .notNull(),

  createdBy: text("created_by")
    .notNull()
    .references(() => users.id),

  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
