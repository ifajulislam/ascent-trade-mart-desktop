import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { randomUUID } from "node:crypto";

export const users = sqliteTable("users", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => randomUUID()),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),

  // Enforces mandatory password hashed string for every user
  password: text("password").notNull(),

  role: text("role", { enum: ["admin", "employee"] })
    .default("employee")
    .notNull(),

  // Forces employee to update password on initial login for security
  requiresPasswordChange: integer("requires_password_change", {
    mode: "boolean",
  })
    .default(true)
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

// Prevents accidental leakage of password hash across IPC bridge
export type SafeUser = Omit<User, "password">;
