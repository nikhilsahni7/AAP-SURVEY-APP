import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";

export default function AboutScreen() {
  const handleContactSupport = () => {
    Linking.openURL("mailto:support@voterapp.com");
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>About Voter Survey App</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.introText}>
          Welcome to the Voter Survey Application - Your comprehensive tool for
          collecting and analyzing voter preferences and electoral insights.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Survey Collection</Text>
          <Text style={styles.cardContent}>
            • Easily collect voter information and preferences{"\n"}• Bilingual
            support (English & Hindi){"\n"}• Track preferences for different
            political parties{"\n"}• Record candidate preferences for upcoming
            elections
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Data Analysis</Text>
          <Text style={styles.cardContent}>
            • Real-time analysis of survey responses{"\n"}• Visual
            representation of party preferences{"\n"}• Detailed candidate
            popularity metrics{"\n"}• Export data in CSV format for further
            analysis
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Features</Text>
          <Text style={styles.cardContent}>
            • Secure data collection{"\n"}• Offline support{"\n"}•
            Multi-language interface{"\n"}• Easy-to-use form submission{"\n"}•
            Comprehensive analytics dashboard
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>2025 Delhi Elections</Text>
          <Text style={styles.cardContent}>
            This app is specifically designed to gather voter insights for the
            upcoming 2025 Delhi Legislative Assembly elections, helping
            understand voter preferences and electoral trends.
          </Text>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContactSupport}>
          <Text style={styles.buttonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  headerContainer: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    paddingTop: 60,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: "center",
  },
  headerText: {
    fontSize: 28,
    color: "#fff",
    fontFamily: "outfit-bold",
  },
  scrollContainer: {
    padding: 20,
  },
  introText: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
    fontFamily: "outfit-medium",
    lineHeight: 24,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    marginBottom: 10,
    fontFamily: "outfit-bold",
    color: Colors.PRIMARY,
  },
  cardContent: {
    fontSize: 14,
    color: "#555",
    fontFamily: "outfit-medium",
    lineHeight: 22,
  },
  button: {
    backgroundColor: Colors.PRIMARY,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "outfit-bold",
  },
});
