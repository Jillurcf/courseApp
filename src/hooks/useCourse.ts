
import { normalizeCourses } from "@/utils/normalizeCourse";
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { db } from "../database/sqlite";
import { syncCourses } from "../features/courses/logic/syncCourses";
import { useCourseStore } from "../store/course.store";

export const useCourses = () => {
  const setCourses = useCourseStore((s) => s.setCourses);

  useEffect(() => {
    const load = async () => {


      // STEP 1: LOAD FROM SQLITE FIRST (FAST + OFFLINE)
      const local = await db.getAllAsync(
        "SELECT * FROM courses"
      );



       setCourses(normalizeCourses(local))
      // STEP 2: CHECK INTERNET
      const net = await NetInfo.fetch();

      if (!net.isConnected) {
   
        return;
      }

      // STEP 3: SYNC IN BACKGROUND
      try {
        await syncCourses();

        // STEP 4: RELOAD UPDATED DATA
        const updated = await db.getAllAsync(
          "SELECT * FROM courses"
        );

        setCourses(updated);
      } catch (e) {
       
      }
    };

    load();
  }, []);
};