// import { useCallback, useEffect, useState } from "react";
// import { syncCourses } from "../features/courses/logic/syncCourses";
// import { getLocalCourses } from "../features/courses/repo/course.repo";
// import { useCourseStore } from "../store/course.store";

// export const useCourses = () => {
//     console.log("🔥 useCourses called");
//   const setCourses = useCourseStore((s) => s.setCourses);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<Error | null>(null);

//   const loadCourses = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const local = await getLocalCourses();
//       setCourses(local);

//       await syncCourses();

//       const updated = await getLocalCourses();
//       setCourses(updated);
//     } catch (err) {
//       console.error("loadCourses error:", err);
//       setError(err as Error);
//     } finally {
//       setLoading(false);
//     }
//   }, [setCourses]);

//   useEffect(() => {
//     loadCourses();
//   }, [loadCourses]);

//   return {
//     loading,
//     error,
//     reload: loadCourses,
//   };
// };
import NetInfo from "@react-native-community/netinfo";
import { useEffect } from "react";
import { db } from "../database/sqlite";
import { syncCourses } from "../features/courses/logic/syncCourses";
import { useCourseStore } from "../store/course.store";

export const useCourses = () => {
  const setCourses = useCourseStore((s) => s.setCourses);

  useEffect(() => {
    const load = async () => {
      console.log("🔥 useCourses called");

      // STEP 1: LOAD FROM SQLITE FIRST (FAST + OFFLINE)
      const local = await db.getAllAsync(
        "SELECT * FROM courses"
      );

      console.log("📦 LOCAL DATA:", local);

      setCourses(local);

      // STEP 2: CHECK INTERNET
      const net = await NetInfo.fetch();

      if (!net.isConnected) {
        console.log("📴 Offline mode - skipping sync");
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
        console.log("⚠️ Sync failed, using local data only");
      }
    };

    load();
  }, []);
};