import { initDB } from "@/database/initDB";
import { useAutoSync } from "@/hooks/useAutoSync";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function RootLayout() {
  const [ready, setReady] = useState(false);
  useAutoSync();
  useEffect(() => {
    const setup = async () => {
      try {
        await initDB();
      } catch (err) {
        console.log("DB init error:", err);
      } finally {
        setReady(true);
      }
    };

    setup();
  }, []);

  if (!ready) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}