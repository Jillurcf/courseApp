import React from "react";
import { Text, TouchableOpacity } from "react-native";

export const CourseItem = React.memo(({ item, onPress }: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 12,
        borderWidth: 1,
        marginVertical: 8,
        borderRadius: 8,
      }}
    >
      <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
      <Text>{item.instructor_name}</Text>
    </TouchableOpacity>
  );
});