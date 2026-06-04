// import { initDB } from "@/database/initDB";
// import { Stack } from "expo-router";
// import { useEffect } from "react";

// export default function RootLayout() {

//   useEffect(() => {
//   initDB();
// }, []);
//   return (
//     <Stack
//       screenOptions={{
//         headerShown: false,
//       }}
//     />
//   );
// }

import { initDB } from "@/database/initDB";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const setup = async () => {
      await initDB();
      setReady(true);
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
    <Stack screenOptions={{ headerShown: false }} />
  );
}