import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import axios from "axios";

const API_URL = "https://voter-app-backend.onrender.com";

const SurveyPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    preferredParty: "",
    aapCandidate: "",
    bjpCandidate: "",
    congressCandidate: "",
    otherPartyCandidate: "",
    customInputs: {
      preferredParty: "",
      aapCandidate: "",
      bjpCandidate: "",
    },
  });

  const questions = [
    {
      id: "name",
      questionHin: "नाम",
      questionEng: "Name",
      type: "input",
    },
    {
      id: "contact",
      questionHin: "संपर्क नंबर",
      questionEng: "Contact Number",
      type: "input",
    },
    {
      id: "address",
      questionHin: "पता",
      questionEng: "Address",
      type: "input",
    },
    {
      id: "preferredParty",
      questionHin:
        "दिल्ली 2025 विधानसभा चुनाव में आप किस पार्टी की सरकार देखना चाहते हैं",
      questionEng:
        "Which party's government would you like to see in the Delhi Legislative Assembly?",
      type: "options",
      options: [
        "Aam Aadmi Party (AAP) / आम आदमी पार्टी (आप)",
        "Bharatiya Janata Party (BJP) / भारतीय जनता पार्टी (भाजपा)",
        "Indian National Congress / भारतीय राष्ट्रीय कांग्रेस",
        "Other / अन्य",
      ],
    },
    {
      id: "aapCandidate",
      questionHin:
        "आने वाले 2025 विधानसभा चुनाव में आप आम आदमी पार्टी से किसे विधायक के रूप में देखना चाहते हैं?",
      questionEng:
        "Who would you like to see as the AAP candidate for MLA in the upcoming 2025 Legislative Assembly elections?",
      type: "options",
      options: [
        "श्रीचंद वोहरा जी / Shri Chand Vohra Ji",
        "राम सिंह नेता जी / Ram Singh Neta Ji",
        "Other / अन्य",
      ],
      showIf: (formData) =>
        formData.preferredParty ===
        "Aam Aadmi Party (AAP) / आम आदमी पार्टी (आप)",
    },
    {
      id: "bjpCandidate",
      questionHin:
        "आने वाले 2025 विधानसभा चुनाव में आप BJP से किसे विधायक के रूप में देखना चाहते हैं?",
      questionEng:
        "Who would you like to see as the BJP candidate for MLA in the upcoming 2025 Legislative Assembly elections?",
      type: "options",
      options: [
        "सुरेंद्र बिधूड़ी जी / Surender Bidhuri Ji",
        "एनडी शर्मा जी / N.D. Sharma Ji",
        "सुरभान पांडे जी / Surbhan Pandey Ji",
        "केके शुक्ला जी / K.K. Shukla Ji",
        "Other / अन्य",
      ],
      showIf: (formData) =>
        formData.preferredParty ===
        "Bharatiya Janata Party (BJP) / भारतीय जनता पार्टी (भाजपा)",
    },
    {
      id: "congressCandidate",
      questionHin:
        "आने वाले 2025 विधानसभा चुनाव में आप कांग्रेस से किसे विधायक के रूप में देखना चाहते हैं?",
      questionEng:
        "Who would you like to see as the Congress candidate for MLA in the upcoming 2025 Legislative Assembly elections?",
      type: "input",
      showIf: (formData) =>
        formData.preferredParty ===
        "Indian National Congress / भारतीय राष्ट्रीय कांग्रेस",
    },
    {
      id: "otherPartyCandidate",
      questionHin:
        "आने वाले 2025 विधानसभा चुनाव में आप किसी अन्य पार्टी से किसे विधायक के रूप में देखना चाहते हैं?",
      questionEng:
        "Who would you like to see as the candidate for MLA from any other party in the upcoming 2025 Legislative Assembly elections?",
      type: "input",
      showIf: (formData) => formData.preferredParty === "Other / अन्य",
    },
  ];

  const handleInputChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCustomInputChange = (id, value) => {
    setFormData((prev) => ({
      ...prev,
      customInputs: {
        ...prev.customInputs,
        [id]: value,
      },
    }));
  };

  const handleOptionSelect = (questionId, option) => {
    if (questionId === "preferredParty") {
      // Clear all candidate-related fields when party selection changes
      setFormData((prev) => ({
        ...prev,
        preferredParty: option,
        aapCandidate: "",
        bjpCandidate: "",
        congressCandidate: "",
        otherPartyCandidate: "",
        customInputs: {
          ...prev.customInputs,
          preferredParty:
            option === "Other / अन्य" ? "" : prev.customInputs.preferredParty,
          aapCandidate: "",
          bjpCandidate: "",
        },
      }));
    } else {
      // Handle candidate selection
      setFormData((prev) => ({
        ...prev,
        [questionId]: option,
        customInputs: {
          ...prev.customInputs,
          [questionId]:
            option === "Other / अन्य" ? "" : prev.customInputs[questionId],
        },
      }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.contact || !formData.address) {
      Alert.alert(
        "Error",
        "Please fill in all required fields (Name, Contact, Address)"
      );
      return false;
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(formData.contact)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number");
      return false;
    }

    // Validate that a party is selected
    if (!formData.preferredParty) {
      Alert.alert("Error", "Please select a preferred party");
      return false;
    }

    // Validate candidate selection based on party
    const party = formData.preferredParty;
    if (
      party === "Aam Aadmi Party (AAP) / आम आदमी पार्टी (आप)" &&
      !formData.aapCandidate &&
      !formData.customInputs.aapCandidate
    ) {
      Alert.alert("Error", "Please select or specify an AAP candidate");
      return false;
    }
    if (
      party === "Bharatiya Janata Party (BJP) / भारतीय जनता पार्टी (भाजपा)" &&
      !formData.bjpCandidate &&
      !formData.customInputs.bjpCandidate
    ) {
      Alert.alert("Error", "Please select or specify a BJP candidate");
      return false;
    }
    if (
      party === "Indian National Congress / भारतीय राष्ट्रीय कांग्रेस" &&
      !formData.congressCandidate
    ) {
      Alert.alert("Error", "Please specify a Congress candidate");
      return false;
    }
    if (party === "Other / अन्य" && !formData.otherPartyCandidate) {
      Alert.alert("Error", "Please specify a candidate");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const submissionData = {
        ...formData,
        // Handle party selection
        preferredParty:
          formData.preferredParty === "Other / अन्य"
            ? formData.customInputs.preferredParty
            : formData.preferredParty,
        // Handle AAP candidate
        aapCandidate:
          formData.aapCandidate === "Other / अन्य"
            ? formData.customInputs.aapCandidate
            : formData.aapCandidate,
        // Handle BJP candidate
        bjpCandidate:
          formData.bjpCandidate === "Other / अन्य"
            ? formData.customInputs.bjpCandidate
            : formData.bjpCandidate,
      };

      const response = await axios.post(
        `${API_URL}/api/surveys`,
        submissionData
      );

      if (response.status === 201) {
        Alert.alert("Success", "Survey submitted successfully", [
          {
            text: "OK",
            onPress: () => router.push("/(tabs)"),
          },
        ]);
      }
    } catch (error) {
      console.error("Survey submission error:", error);
      Alert.alert("Error", "Failed to submit survey. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderQuestion = (question) => {
    // Check if the question should be shown based on the showIf condition
    if (question.showIf && !question.showIf(formData)) {
      return null;
    }

    return (
      <View key={question.id} style={styles.questionContainer}>
        <Text style={styles.questionTextHindi}>{question.questionHin}</Text>
        <Text style={styles.questionText}>{question.questionEng}</Text>

        {question.type === "input" ? (
          <TextInput
            style={styles.input}
            value={formData[question.id]}
            onChangeText={(text) => handleInputChange(question.id, text)}
            placeholder="अपना उत्तर दें / Enter your answer"
          />
        ) : (
          <View>
            {question.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  formData[question.id] === option && styles.selectedOption,
                ]}
                onPress={() => handleOptionSelect(question.id, option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    formData[question.id] === option &&
                      styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
            {formData[question.id] === "Other / अन्य" && (
              <TextInput
                style={styles.input}
                value={formData.customInputs[question.id] || ""}
                onChangeText={(text) =>
                  handleCustomInputChange(question.id, text)
                }
                placeholder="कृपया बताएं / Please specify"
              />
            )}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerText}>Survey App</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {questions.map(renderQuestion)}
        <TouchableOpacity
          style={[styles.submitButton, loading && styles.disabledButton]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 20,
  },
  headerContainer: {
    width: "100%",
    padding: 35,
    paddingTop: 40,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 30,
    marginBottom: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "outfit-medium",
  },
  headerText: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  questionContainer: {
    marginBottom: 25,
  },
  questionText: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
    fontFamily: "outfit-medium",
  },
  questionTextHindi: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    fontFamily: "outfit-bold",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    fontSize: 18,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  optionButton: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    marginTop: 10,
  },
  selectedOption: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  optionText: {
    fontSize: 18,
  },
  selectedOptionText: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: Colors.PRIMARY,
    padding: 18,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "outfit-bold",
  },
  disabledButton: {
    opacity: 0.5,
  },
});

export default SurveyPage;
