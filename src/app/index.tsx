import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import {
  FlatList,
  RefreshControl,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { CourseItem } from "@/components/CourseItem";
import { db } from "../database/sqlite";
import { syncCourses } from "../features/courses/logic/syncCourses";
import { useCourses } from "../hooks/useCourse";
import { useCourseStore } from "../store/course.store";

export default function CourseListScreen() {
  const router = useRouter();

  const [refreshing, setRefreshing] = useState(false);
  const [lastSynced, setLastSynced] = useState<string | null>(null);

  const [filter, setFilter] = useState<{
    isPremium: boolean | null;
    isEnrolled: number | null;
  }>({
    isPremium: null,
    isEnrolled: null,
  });

  const [search, setSearch] = useState("");

  useCourses();

  const courses = useCourseStore((s) => s.courses);
  const setCourses = useCourseStore((s) => s.setCourses);

  // ================= FILTER =================
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

  // ================= REFRESH =================
  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await syncCourses();

      const local = await db.getAllAsync("SELECT * FROM courses");

      setCourses(local);
      setLastSynced(new Date().toISOString());
    } catch (err) {
      console.log(err);
    } finally {
      setRefreshing(false);
    }
  };

  // ================= ITEM =================
  const renderItem = useCallback(
    ({ item }) => (
      <CourseItem
        item={item}
        onPress={() =>
          router.push({
            pathname: "/course/[id]",
            params: { id: item.course_id },
          })
        }
      />
    ),
    []
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F8FC", padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER CARD */}
      <View
        style={{
          backgroundColor: "#2563EB",
          padding: 16,
          borderRadius: 16,
          marginBottom: 12,
        }}
      >
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
          📚 Course App
        </Text>

        <Text style={{ color: "white", opacity: 0.8, marginTop: 4 }}>
          Learn anytime, anywhere
        </Text>

        <Text style={{ color: "#E5E7EB", fontSize: 12, marginTop: 6 }}>
          Last synced:{" "}
          {lastSynced
            ? new Date(lastSynced).toLocaleString()
            : "Never"}
        </Text>
      </View>

      {/* SEARCH */}
      <TextInput
        placeholder="🔍 Search courses..."
        value={search}
        onChangeText={setSearch}
        style={{
          backgroundColor: "white",
          padding: 12,
          borderRadius: 12,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOpacity: 0.05,
          shadowRadius: 5,
          elevation: 2,
        }}
      />

      {/* FILTER CHIPS */}
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 8,
          marginBottom: 10,
        }}
      >
        {[
          { label: "All", value: null },
          { label: "Free", value: false },
          { label: "Premium", value: true },
        ].map((item) => (
          <TouchableOpacity
            key={item.label}
            onPress={() =>
              setFilter((prev) => ({
                ...prev,
                isPremium: item.value as any,
              }))
            }
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              borderRadius: 20,
              backgroundColor:
                filter.isPremium === item.value
                  ? "#2563EB"
                  : "white",
              borderWidth: 1,
              borderColor: "#E5E7EB",
            }}
          >
            <Text
              style={{
                color:
                  filter.isPremium === item.value
                    ? "white"
                    : "#111827",
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.course_id}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#2563EB"]}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}