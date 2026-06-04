import { db } from "./sqlite";

export const initDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS courses (
      course_id TEXT PRIMARY KEY,
      title TEXT,
      description_short TEXT,
      instructor_name TEXT,
      duration_weeks INTEGER,
      price_usd REAL,
      is_premium INTEGER,
      tags TEXT,
      rating REAL,
      is_enrolled INTEGER DEFAULT 0,
      last_updated TEXT
    );
  `);
};