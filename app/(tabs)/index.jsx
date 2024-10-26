import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Header from "../../components/Home/Header";
import { TouchableOpacity } from "react-native";
import { Colors } from "../../constants/Colors";
import { useRouter } from "expo-router";

export default function Index() {
  // Changed from 'home' to 'Index'
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.titleText}>What would you like to do?</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/survey")}
      >
        <Text style={styles.btnText}>New Survey</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.btnText}>Data Search</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleText: {
    fontSize: 20,
    fontFamily: "outfit-medium",
    textAlign: "center",
    paddingTop: 200,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    padding: 16,
    borderRadius: 99,
    marginTop: 20,
    marginHorizontal: 20,
  },
  btnText: {
    textAlign: "center",
    color: "#fff",
    fontFamily: "outfit",
  },
});
