import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";

const sqlite = new Database(process.env.DB_URL || "./data/db.sqlite");
export const db = drizzle({ client: sqlite });
