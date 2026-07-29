import DatabaseConstructor, { type Database } from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { app } from "electron";
import path from "node:path";
import fs from "node:fs";
import * as schema from "./schema/user.schema";

const userDataPath = app.getPath("userData");

if (!fs.existsSync(userDataPath)) {
  fs.mkdirSync(userDataPath, { recursive: true });
}

const dbPath = path.join(userDataPath, "ascent.db");

const sqlite: Database = new DatabaseConstructor(dbPath);

sqlite.pragma("journal_mode = WAL");
sqlite.pragma("foreign_keys = ON");
sqlite.pragma("synchronous = NORMAL");

export const db = drizzle(sqlite, { schema });
export { dbPath };
