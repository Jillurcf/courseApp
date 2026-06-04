import {
  FlatList,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import { useRouter } from "../../../../.expo/types/router";
import { useCourses } from "../../../hooks/useCourse";
import { useCourseStore } from "../../../store/course.store";

export default function CourseListScreen() {
  const router = useRouter();

  const { loading, error } = useCourses();

  const courses = useCourseStore((s) => s.courses);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        Courses
      </Text>

      <FlatList
        data={courses}
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