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
        <Text>Loading course...</Text>
      </View>
    );
  }

  // ================= SAFE TAG PARSING =================
  let tags: string[] = [];

  try {
    tags =
      typeof course.tags === "string"
        ? JSON.parse(course.tags)
        : course.tags || [];
  } catch (e) {
    tags = [];
  }

  const isEnrolled = course.is_enrolled === 1;
  const isPremium = course.is_premium === 1;

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
        <Text style={{ fontSize: 22, fontWeight: "bold", color: "white" }}>
          {course.title}
        </Text>

        <Text style={{ color: "white", marginTop: 6 }}>
          ⭐ {course.rating} • 👨 {course.instructor_name}
        </Text>
      </View>

      {/* DETAILS CARD */}
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

        <Text style={{ marginBottom: 6 }}>
          👨 Instructor: {course.instructor_name}
        </Text>

        {/* ================= TAGS ================= */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
          {tags.map((tag: string, index: number) => (
            <View
              key={index}
              style={{
                backgroundColor: "#E5E7EB",
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 20,
              }}
            >
              <Text style={{ fontSize: 12 }}>{tag}</Text>
            </View>
          ))}
        </View>

        {/* ================= BADGES ================= */}
        <View style={{ flexDirection: "row", gap: 10, marginTop: 12 }}>
          {/* Premium */}
          <View
            style={{
              backgroundColor: isPremium ? "#FEF3C7" : "#DCFCE7",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: isPremium ? "#B45309" : "#16A34A",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {isPremium ? "Premium" : "Free"}
            </Text>
          </View>

          {/* Enrollment */}
          <View
            style={{
              backgroundColor: isEnrolled ? "#DCFCE7" : "#F3F4F6",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                color: isEnrolled ? "#16A34A" : "#6B7280",
                fontWeight: "600",
                fontSize: 12,
              }}
            >
              {isEnrolled ? "Enrolled" : "Not Enrolled"}
            </Text>
          </View>
        </View>
      </View>

      {/* ================= ACTION BUTTON ================= */}
      <TouchableOpacity
        onPress={() => toggleEnroll(course.course_id)}
        style={{
          backgroundColor: isEnrolled ? "#EF4444" : "#2563EB",
          paddingVertical: 14,
          borderRadius: 14,
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
          {isEnrolled ? "Remove Enrollment" : "Enroll Now"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}