import { Button, Text, View } from "react-native";
import { useRouter } from "../../../../.expo/types/router";
import { useCourseStore } from "../../../store/course.store";

export const CourseDetailScreen = ({ route }: any) => {
  const { course } = route.params;
  const toggleEnroll = useCourseStore((s) => s.toggleEnroll);
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 16 }}>

      {/* 🔙 BACK BUTTON */}
      <Button title="⬅ Back" onPress={() => router.back()} />

      <Text style={{ fontSize: 22, fontWeight: "bold", marginTop: 10 }}>
        {course.title}
      </Text>

      <Text>{course.description_short}</Text>
      <Text>Instructor: {course.instructor_name}</Text>
      <Text>Duration: {course.duration_weeks} weeks</Text>
      <Text>Rating: {course.rating}</Text>

      <Text
        style={{
          marginTop: 10,
          color: course.is_enrolled ? "green" : "gray",
        }}
      >
        {course.is_enrolled ? "Enrolled" : "Not Enrolled"}
      </Text>

      <Button
        title={course.is_enrolled ? "Remove Enrollment" : "Enroll Now"}
        onPress={() => toggleEnroll(course.course_id)}
      />
    </View>
  );
};