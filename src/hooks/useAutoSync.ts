
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { db } from "../database/sqlite";
import { syncCourses } from "../features/courses/logic/syncCourses";
import { useCourseStore } from "../store/course.store";
export const useAutoSync = () => {
  const setCourses = useCourseStore((s) => s.setCourses);
  const setLastSynced = useCourseStore((s) => s.setLastSynced);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      if (state.isConnected) {
        await syncCourses();

        const local = await db.getAllAsync("SELECT * FROM courses");
        const normalized = local.map((course: any) => ({
          ...course,
          is_premium: Boolean(course.is_premium),
          is_enrolled: Number(course.is_enrolled),
        }));

        setCourses(normalized);

        // setCourses(local);
        setLastSynced(new Date().toISOString());
      }
    });

    return () => unsubscribe();
  }, []);
};