import { Stack } from "expo-router";

export default function AccountLayout() {
  return (
    <Stack>
      {/* Default Account Screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
      {/* faq subpage */}
      <Stack.Screen name="help" options={{ title: "Help and Support" }} />
      {/* terms&conditions subpage */}
      <Stack.Screen name="terms" options={{ title: "Terms and Conditions" }} />
    </Stack>
  );
}