import { db } from "../../../database/sqlite";
import { fetchCourses } from "../api/course.api";

export const syncCourses = async () => {
  try {
    const serverData = await fetchCourses();

    if (!serverData) return false;

    for (const c of serverData) {
      await db.runAsync(
        `INSERT OR REPLACE INTO courses 
        (
          course_id,
          title,
          description_short,
          instructor_name,
          duration_weeks,
          price_usd,
          is_premium,
          tags,
          rating,
          is_enrolled,
          last_updated
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 
          COALESCE((SELECT is_enrolled FROM courses WHERE course_id = ?), 0),
          ?
        )`,
        [
          c.course_id,
          c.title,
          c.description_short,
          c.instructor_name,
          c.duration_weeks,
          c.price_usd,
          c.is_premium ? 1 : 0,
          JSON.stringify(c.tags),
          c.rating,
          c.course_id,
          c.last_updated,
        ]
      );
    }

    return true;
  } catch (e) {
    console.log("Sync failed", e);
    return false;
  }
};