import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { authStyles } from "../../assets/styles/auth.styles";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [secureText, setSecureText] = useState(true);
  const router = useRouter();

  const isFormValid = phone.length === 10 && password.length >= 8;

  // Load saved credentials if any
  useEffect(() => {
    const loadCredentials = async () => {
      const savedPhone = await AsyncStorage.getItem("phone");
      const savedPassword = await AsyncStorage.getItem("password");

      if (savedPhone) setPhone(savedPhone);
      if (savedPassword) setPassword(savedPassword);
      if (savedPhone || savedPassword) setRememberMe(true);
    };
    loadCredentials();
  }, []);

  const handleContinue = async () => {
    if (!isFormValid) return;

    if (rememberMe) {
      // Save phone & password
      await AsyncStorage.setItem("phone", phone);
      await AsyncStorage.setItem("password", password);
    } else {
      // Remove saved credentials
      await AsyncStorage.removeItem("phone");
      await AsyncStorage.removeItem("password");
    }

    router.push(`/otp?phone=${phone}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.welcome}>WELCOME BACK</Text>
      <Text style={styles.title}>Log In to your Account</Text>

      {/* Phone Number */}
      <TextInput
        style={styles.input}
        placeholder="Phone no"
        keyboardType="phone-pad"
        value={phone}
        maxLength={10}
        onChangeText={(text) => setPhone(text.replace(/[^0-9]/g, ""))}
      />
      {phone.length > 0 && phone.length < 10 && (
        <Text style={styles.errorText}>Phone number must be 10 digits</Text>
      )}

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          secureTextEntry={secureText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setSecureText(!secureText)}
          style={styles.eyeIcon}
        >
          <Ionicons
            name={secureText ? "eye-off" : "eye"}
            size={20}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      {password.length === 0 && phone.length === 10 && (
        <Text style={styles.errorText}>Password cannot be empty</Text>
      )}
      {password.length > 0 && password.length < 8 && (
        <Text style={styles.errorText}>
          Password must contain at least 8 alpha-numeric characters
        </Text>
      )}

      {/* Remember Me & Resend OTP */}
      <View style={styles.row}>
        <View style={styles.row}>
          <Checkbox
            value={rememberMe}
            onValueChange={setRememberMe}
            color={rememberMe ? "#000" : undefined}
          />
          <Text style={{ marginLeft: 6 }}>Remember me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.link}>Resend OTP?</Text>
        </TouchableOpacity>
      </View>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueBtn,
          { backgroundColor: isFormValid ? "black" : "gray" },
        ]}
        onPress={handleContinue}
        disabled={!isFormValid}
      >
        <Text style={styles.continueText}>CONTINUE</Text>
      </TouchableOpacity>

      {/* OR Divider */}
      <Text style={styles.orText}>OR</Text>

      {/* Social Login Buttons */}
      <TouchableOpacity style={styles.socialBtn}>
        <Image
          source={require("../../assets/images/google.webp")}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Log In with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn}>
        <Image
          source={require("../../assets/images/facebook2.webp")}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Log In with Facebook</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.socialBtn}>
        <Image
          source={require("../../assets/images/apple2.png")}
          style={styles.socialIcon}
        />
        <Text style={styles.socialText}>Log In with Apple</Text>
      </TouchableOpacity>

      {/* Sign Up */}
      <TouchableOpacity
        style={authStyles.linkContainer}
        onPress={() => router.push("/signup")}
      >
        <Text style={authStyles.linkText}>
          Don&apos;t have an account?{" "}
          <Text style={authStyles.link}>Sign Up</Text>
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  welcome: { fontSize: 14, fontWeight: "500", marginBottom: 6 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    marginBottom: 5,
    fontSize: 16,
  },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    marginBottom: 5,
  },
  passwordInput: { flex: 1, padding: 12, fontSize: 16 },
  eyeIcon: { paddingHorizontal: 10 },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  link: { color: "black", fontWeight: "500" },
  continueBtn: { padding: 14, borderRadius: 6, alignItems: "center", marginBottom: 20 },
  continueText: { color: "white", fontSize: 16, fontWeight: "bold" },
  orText: { textAlign: "center", marginBottom: 20, fontSize: 14, color: "gray" },
  socialBtn: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: "#fff",
  },
  socialIcon: { width: 20, height: 20, resizeMode: "contain", marginRight: 10 },
  socialText: { fontSize: 16, color: "#000" },
});
