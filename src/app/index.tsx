import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import {
  Button,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { db } from "../database/sqlite";
import { syncCourses } from "../features/courses/logic/syncCourses";
import { useCourses } from "../hooks/useCourse";
import { useCourseStore } from "../store/course.store";

export default function CourseListScreen() {
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const [filter, setFilter] = useState<{
    isPremium: boolean | null;
    isEnrolled: number | null;
  }>({
    isPremium: null,
    isEnrolled: null,
  });

  const router = useRouter();

  // Load initial data (offline-first)
  useCourses();

  const courses = useCourseStore((s) => s.courses);
  const setCourses = useCourseStore((s) => s.setCourses);

  console.log("Courses:", courses);

  // ================= FILTER LOGIC =================
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor_name.toLowerCase().includes(search.toLowerCase());

      const matchPremium =
        filter.isPremium === null ||
        course.is_premium === filter.isPremium;

      const matchEnroll =
        filter.isEnrolled === null ||
        course.is_enrolled === filter.isEnrolled;

      return matchSearch && matchPremium && matchEnroll;
    });
  }, [courses, search, filter]);

  // ================= REFRESH FUNCTION =================
  const onRefresh = async () => {
    try {
      setRefreshing(true);

      console.log("🔄 Syncing courses...");

      // 1. Sync from Supabase → SQLite
      await syncCourses();

      // 2. Read from SQLite (offline source of truth)
      const local = await db.getAllAsync(
        "SELECT * FROM courses"
      );

      console.log("📦 Refreshed data:", local);

      // 3. Update Zustand store
      setCourses(local);
    } catch (err) {
      console.log("❌ Refresh error:", err);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Courses
      </Text>

      {/* ================= SEARCH ================= */}
      <TextInput
        placeholder="Search courses..."
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
        onChangeText={setSearch}
      />

      {/* ================= FILTERS ================= */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <Button
          title="All"
          onPress={() =>
            setFilter({ isPremium: null, isEnrolled: null })
          }
        />

        <Button
          title="Free"
          onPress={() =>
            setFilter((prev) => ({
              ...prev,
              isPremium: false,
            }))
          }
        />

        <Button
          title="Premium"
          onPress={() =>
            setFilter((prev) => ({
              ...prev,
              isPremium: true,
            }))
          }
        />

        <Button
          title="Enrolled"
          onPress={() =>
            setFilter((prev) => ({
              ...prev,
              isEnrolled: 1,
            }))
          }
        />
      </View>

      {/* ================= LIST ================= */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.course_id}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/course/[id]",
                params: { id: String(item.course_id) },
              })
            }
            style={{
              padding: 12,
              borderWidth: 1,
              marginVertical: 8,
              borderRadius: 8,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {item.title}
            </Text>
            <Text>{item.instructor_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}