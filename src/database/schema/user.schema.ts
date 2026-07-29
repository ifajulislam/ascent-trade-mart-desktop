import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),

  name: text("name").notNull(),
  username: text("username").notNull().unique(),

  // ONLY required for Admins. Employees can leave this blank.
  password: text("password"),
  pin: text("pin").notNull(),

  role: text("role", { enum: ["admin", "employee"] })
    .default("employee")
    .notNull(),

  createdAt: integer("created_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .$defaultFn(() => new Date())
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type SafeUser = Omit<User, "password" | "pin">;
