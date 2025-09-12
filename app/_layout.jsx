import { Stack } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { MediaProvider } from './MediaContext';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <MediaProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
          <Stack screenOptions={{ headerShown: false , contentStyle: { backgroundColor: '#000000' }}} />
        </SafeAreaView>
      </MediaProvider>
    </SafeAreaProvider>
  );
}