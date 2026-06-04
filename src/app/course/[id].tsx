import { useLocalSearchParams } from "expo-router";
import { Button, Text, View } from "react-native";
import { useCourseStore } from "../../store/course.store";

export default function CourseDetail() {
  const { id } = useLocalSearchParams();
  const toggleEnroll = useCourseStore((s) => s.toggleEnroll);
  const courses = useCourseStore((s) => s.courses);

  const course = courses.find((c) => c.course_id === id);

  if (!course) return <Text>Loading...</Text>;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 22 }}>{course.title}</Text>

      <Text>{course.description_short}</Text>

      <Text>
        Status: {course.is_enrolled ? "Enrolled" : "Not Enrolled"}
      </Text>

      <Button
        title="Toggle Enrollment"
        onPress={() => toggleEnroll(course.course_id)}
      />
    </View>
  );
}