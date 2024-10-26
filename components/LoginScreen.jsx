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

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

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
    marginTop: 40, // Reduced from 100
  },
  image: {
    width: 180, // Reduced from 220
    height: 300, // Reduced from 450
    borderRadius: 20,
    borderWidth: 6,
    borderColor: "#000",
  },
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: 20, // Changed from -20
    flex: 1,
  },
  title: {
    fontSize: 24, // Reduced from 30
    fontFamily: "outfit-bold",
    textAlign: "center",
  },
  highlight: {
    color: Colors.PRIMARY,
  },
  subtitle: {
    fontSize: 14, // Reduced from 15
    fontFamily: "outfit",
    textAlign: "center",
    marginVertical: 10, // Reduced from 15
    color: Colors.GRAY,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.GRAY,
    padding: 12, // Reduced from 15
    borderRadius: 10,
    marginVertical: 8, // Reduced from 10
    fontFamily: "outfit",
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 14, // Reduced from 16
    borderRadius: 99,
    marginTop: 16, // Reduced from 20
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "outfit",
  },
});
