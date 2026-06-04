import { db } from "../../../database/sqlite";

export const getLocalCourses = async () => {
  const result = await db.getAllAsync(
    "SELECT * FROM courses"
  );

  return result;
};