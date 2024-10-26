import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const VALID_EMAIL = "Vohraji3900@gmail.com";
  const VALID_PASSWORD = "7827272827";

  const handleLogin = async () => {
    try {
      if (email === VALID_EMAIL && password === VALID_PASSWORD) {
        await router.replace("/(tabs)");
      } else {
        Alert.alert(
          "Login Failed",
          "Invalid email or password. Please try again."
        );
      }
    } catch (error) {
      console.error("Navigation error:", error);
      Alert.alert("Error", "There was a problem logging in. Please try again.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.imageContainer}>
        <Image
          source={require("./../assets/images/loginPic.jpg")}
          style={styles.image}
        />
      </View>
      <View style={styles.subContainer}>
        <Text style={styles.title}>
          Your <Text style={styles.highlight}>Go-To app</Text> for all AAP
          related data
        </Text>
        <Text style={styles.subtitle}>
          Use this app to access all the data related to the Aam Aadmi Party.
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color={Colors.GRAY}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.btn} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flexGrow: 1,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  image: {
    width: 180,
    height: 300,
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#000",
  },
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  highlight: {
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 10,
    color: Colors.GRAY,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 12,
    borderRadius: 10,
    marginVertical: 8,
    fontFamily: "outfit",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.GRAY,
    borderRadius: 10,
    marginVertical: 8,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    fontFamily: "outfit",
  },
  eyeIcon: {
    padding: 10,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 14,
    borderRadius: 99,
    marginTop: 16,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "outfit",
  },
});
