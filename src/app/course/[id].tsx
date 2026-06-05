import { router, useLocalSearchParams } from "expo-router";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useCourseStore } from "../../store/course.store";

export default function CourseDetail() {
  const { id } = useLocalSearchParams();

  const toggleEnroll = useCourseStore((s) => s.toggleEnroll);
  const courses = useCourseStore((s) => s.courses);

  const course = courses.find((c) => c.course_id === id);

  if (!course) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#F6F8FC", padding: 16 }}>
      <StatusBar barStyle="dark-content" />

      {/* BACK BUTTON */}
      <TouchableOpacity
        onPress={() => router.back()}
        style={{
          marginBottom: 12,
          backgroundColor: "white",
          alignSelf: "flex-start",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderRadius: 10,
          elevation: 2,
        }}
      >
        <Text style={{ fontWeight: "600" }}>⬅ Back</Text>
      </TouchableOpacity>

      {/* HERO CARD */}
      <View
        style={{
          backgroundColor: "#2563EB",
          padding: 20,
          borderRadius: 20,
          marginBottom: 16,
        }}
      >
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            color: "white",
          }}
        >
          {course.title}
        </Text>

        <Text style={{ color: "white", marginTop: 6 }}>
          ⭐ {course.rating} • 👨 {course.instructor_name}
        </Text>
      </View>

      {/* INFO CARD */}
      <View
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 16,
          marginBottom: 12,
          elevation: 2,
        }}
      >
        <Text style={{ color: "#6B7280", marginBottom: 10 }}>
          {course.description_short}
        </Text>

        <Text style={{ marginBottom: 6 }}>
          🕒 Duration: {course.duration_weeks} weeks
        </Text>

        <Text style={{ marginBottom: 6 }}>
          💰 Price: ${course.price_usd}
        </Text>

        {/* STATUS BADGE */}
        <View
          style={{
            marginTop: 10,
            alignSelf: "flex-start",
            backgroundColor: course.is_enrolled
              ? "#DCFCE7"
              : "#F3F4F6",
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              color: course.is_enrolled
                ? "#16A34A"
                : "#6B7280",
              fontWeight: "600",
            }}
          >
            {course.is_enrolled ? "Enrolled" : "Not Enrolled"}
          </Text>
        </View>
      </View>

      {/* ENROLL BUTTON */}
      <TouchableOpacity
        onPress={() => toggleEnroll(course.course_id)}
        style={{
          backgroundColor: course.is_enrolled
            ? "#EF4444"
            : "#2563EB",
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {course.is_enrolled
            ? "Remove Enrollment"
            : "Enroll Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}