import { useCallback, useEffect, useState } from "react";
import { syncCourses } from "../features/courses/logic/syncCourses";
import { getLocalCourses } from "../features/courses/repo/course.repo";
import { useCourseStore } from "../store/course.store";

export const useCourses = () => {
  const setCourses = useCourseStore((s) => s.setCourses);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const loadCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const local = await getLocalCourses();
      setCourses(local);

      await syncCourses();

      const updated = await getLocalCourses();
      setCourses(updated);
    } catch (err) {
      console.error("loadCourses error:", err);
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [setCourses]);

  useEffect(() => {
    loadCourses();
  }, [loadCourses]);

  return {
    loading,
    error,
    reload: loadCourses,
  };
};