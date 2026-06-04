import { initDB } from "@/database/initDB";
import { Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {

  useEffect(() => {
  initDB();
}, []);
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}