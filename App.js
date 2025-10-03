import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function App() {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleLogin() {
    // quick client-side validation
    if (!email.trim()) {
      Alert.alert("Validation", "Please enter your email.");
      return;
    }
    if (pin.length < 4) {
      Alert.alert("Validation", "PIN must be at least 4 digits.");
      return;
    }

    // Simulate submit (PoC)
    setSubmitted(true);
    // in real app: call your API here and handle response
    setTimeout(() => {
      Alert.alert("Success", `Logged in as ${email}`);
      // reset for demo
      setSubmitted(false);
      setEmail("");
      setPin("");
    }, 800);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 30 : 0}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Hello Bank</Text>
          <Text style={styles.subtitle}>Fast. Secure. Simple.</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="you@example.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            autoComplete="email"
            textContentType="emailAddress"
            accessibilityLabel="Email input"
          />

          <Text style={[styles.label, { marginTop: 12 }]}>4-digit PIN</Text>
          <TextInput
            style={styles.input}
            placeholder="••••"
            keyboardType="number-pad"
            secureTextEntry
            maxLength={6}
            value={pin}
            onChangeText={(t) => setPin(t.replace(/[^0-9]/g, ""))}
            accessibilityLabel="PIN input"
            textContentType="password"
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin}
            accessibilityRole="button"
            accessibilityLabel="Login"
            disabled={submitted}
          >
            <Text style={styles.buttonText}>
              {submitted ? "Signing in..." : "Sign In"}
            </Text>
          </TouchableOpacity>

          <View style={styles.footerRow}>
            <Text style={styles.small}>New here?</Text>
            <Button
              title="Create account"
              onPress={() => Alert.alert("Create account", "Signup flow (PoC)")}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f6f7fb" },
  container: { flex: 1, padding: 20, justifyContent: "center" },
  header: { marginBottom: 24, alignItems: "center" },
  title: { fontSize: 32, fontWeight: "700", color: "#0b3d91" },
  subtitle: { fontSize: 14, color: "#6b7280", marginTop: 6 },
  form: { backgroundColor: "white", borderRadius: 12, padding: 18, elevation: 2 },
  label: { fontSize: 13, color: "#374151", marginBottom: 6 },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 18,
    backgroundColor: "#0b63d4",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "white", fontSize: 16, fontWeight: "600" },
  footerRow: { marginTop: 14, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  small: { color: "#6b7280" },
});
