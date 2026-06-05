import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { Button, FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useCourses } from "../hooks/useCourse";
import { useCourseStore } from "../store/course.store";

export default function CourseListScreen() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<{
    isPremium: boolean | null;
    isEnrolled: number | null;
  }>({
    isPremium: null,
    isEnrolled: null,
  });
  const router = useRouter();
  useCourses();

  const courses = useCourseStore((s) => s.courses);

  // const courses = useCourseStore((s) => s.getFilteredCourses());
  console.log("Courses:", courses);
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
  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Courses
      </Text>
      {/* ============Search ============ */}
      <TextInput
        placeholder="Search courses..."
        style={{
          borderWidth: 1,
          padding: 10,
          marginVertical: 10,
          borderRadius: 8,
        }}
        onChangeText={(text) => setSearch(text)}
      />

      {/* ============ Filters ============ */}
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 10 }}>
        <Button
          title="All"
          onPress={() =>
            setFilter({ isPremium: null, isEnrolled: null })
          }
        />

        <Button
          title="Free"
          onPress={() => setFilter({ isPremium: false })}
        />

        <Button
          title="Premium"
          onPress={() => setFilter({ isPremium: true })}
        />

        <Button
          title="Enrolled"
          onPress={() => setFilter({ isEnrolled: 1 })}
        />
      </View>
      <FlatList
        data={filteredCourses}
        keyExtractor={(item) => item.course_id}
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
            }}
          >
            <Text>{item.title}</Text>
            <Text>{item.instructor_name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}