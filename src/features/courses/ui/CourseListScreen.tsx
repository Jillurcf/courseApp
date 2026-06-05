import { useRouter } from "expo-router";
import { useMemo } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import NetInfo from "@react-native-community/netinfo";

import { useCourses } from "../../../hooks/useCourse";
import { useCourseStore } from "../../../store/course.store";

// simple network hook (inline version)
const useNetwork = () => {
  const state = NetInfo.useNetInfo();
  return state.isConnected;
};

export default function CourseListScreen() {
  const router = useRouter();

  // Load data (offline-first)
  const { loading, error } = useCourses();

  // ===== NETWORK STATUS =====
  const isOnline = useNetwork();

  // ===== Zustand state =====
  const courses = useCourseStore((s) => s.courses);
  const search = useCourseStore((s) => s.search);
  const filter = useCourseStore((s) => s.filter);

  const setSearch = useCourseStore((s) => s.setSearch);
  const setFilter = useCourseStore((s) => s.setFilter);

  // ===== FILTER LOGIC =====
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchSearch =
        course.title.toLowerCase().includes(search.toLowerCase()) ||
        course.instructor_name
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchPremium =
        filter.isPremium === null ||
        course.is_premium === filter.isPremium;

      const matchEnroll =
        filter.isEnrolled === null ||
        course.is_enrolled === filter.isEnrolled;

      return matchSearch && matchPremium && matchEnroll;
    });
  }, [courses, search, filter]);

  // ===== LOADING =====
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading courses...</Text>
      </View>
    );
  }

  // ===== ERROR =====
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>
          {error.message || "Something went wrong"}
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      {/* HEADER */}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Courses
      </Text>

      {/* ✅ OFFLINE / ONLINE BANNER */}
      <View
        style={{
          backgroundColor: isOnline ? "green" : "red",
          padding: 8,
          marginTop: 8,
          marginBottom: 10,
          borderRadius: 6,
        }}
      >
        <Text style={{ color: "white", textAlign: "center" }}>
          {isOnline ? "🟢 Online Mode" : "🔴 Offline Mode"}
        </Text>
      </View>

      {/* SEARCH */}
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

      {/* FILTERS */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <Text onPress={() => setFilter({ isPremium: null, isEnrolled: null })}>
          All
        </Text>

        <Text onPress={() => setFilter({ isPremium: false })}>
          Free
        </Text>

        <Text onPress={() => setFilter({ isPremium: true })}>
          Premium
        </Text>

        <Text onPress={() => setFilter({ isEnrolled: 1 })}>
          Enrolled
        </Text>
      </View>

      {/* LIST */}
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.course_id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push(`/course/${item.course_id}`)
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