import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
} from "react-native";
import { Colors } from "../../constants/Colors";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Ionicons } from "@expo/vector-icons";

// const API_URL = "http://192.168.1.7:3000";
const API_URL = "https://voter-app-backend.onrender.com";
const windowWidth = Dimensions.get("window").width;

const DataScreen = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [surveysResponse, analysisResponse] = await Promise.all([
        axios.get(`${API_URL}/api/surveys`),
        axios.get(`${API_URL}/api/analysis`),
      ]);
      setSurveys(surveysResponse.data);
      setAnalysis(analysisResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchData();
  }, []);

  const downloadCSV = async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/export-csv`, {
        responseType: "text",
      });

      const fileUri = `${FileSystem.documentDirectory}survey_data.csv`;

      await FileSystem.writeAsStringAsync(fileUri, response.data, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      await Sharing.shareAsync(fileUri, {
        mimeType: "text/csv",
        dialogTitle: "Export Survey Data",
        UTI: "public.comma-separated-values-text",
      });
    } catch (error) {
      console.error("Error downloading CSV:", error);
      Alert.alert(
        "Download Failed",
        "Unable to download the CSV file. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const renderAnalysisCard = (title, data) => (
    <View style={styles.analysisCard}>
      <Text style={styles.cardTitle}>{title}</Text>
      {Object.entries(data).map(([key, value]) => (
        <View key={key} style={styles.analysisStat}>
          <Text style={styles.statLabel} numberOfLines={2}>
            {key}
          </Text>
          <Text style={styles.statValue}>
            {value.count} ({value.percentage}%)
          </Text>
        </View>
      ))}
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Survey Analysis</Text>
        <TouchableOpacity style={styles.downloadButton} onPress={downloadCSV}>
          <Ionicons name="download-outline" size={24} color="white" />
          <Text style={styles.downloadText}>Export CSV</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Summary Statistics */}
        <View style={styles.summaryContainer}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {analysis?.totalResponses || 0}
            </Text>
            <Text style={styles.summaryLabel}>Total Responses</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryNumber}>
              {analysis?.demographics?.totalWithContact?.percentage || 0}%
            </Text>
            <Text style={styles.summaryLabel}>Contact Info</Text>
          </View>
        </View>

        {/* Analysis Section */}
        <View style={styles.analysisContainer}>
          {analysis && (
            <>
              {renderAnalysisCard("Party Preference", analysis.partyPreference)}
              {renderAnalysisCard("AAP Candidates", analysis.aapCandidates)}
              {renderAnalysisCard("BJP Candidates", analysis.bjpCandidates)}
              {renderAnalysisCard(
                "Congress Candidates",
                analysis.congressCandidates
              )}
              {renderAnalysisCard(
                "Other Party Candidates",
                analysis.otherPartyCandidates
              )}
            </>
          )}
        </View>

        {/* Data Table */}
        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Survey Responses</Text>
          <ScrollView horizontal>
            <View>
              <View style={styles.tableHeader}>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  Name
                </Text>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  Contact
                </Text>
                <Text style={[styles.headerCell, { width: windowWidth * 0.3 }]}>
                  Address
                </Text>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  Party
                </Text>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  AAP Choice
                </Text>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  BJP Choice
                </Text>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  Congress Choice
                </Text>
                <Text
                  style={[styles.headerCell, { width: windowWidth * 0.25 }]}
                >
                  Other Party
                </Text>
              </View>
              <ScrollView>
                {surveys.map((survey, index) => (
                  <View key={survey._id || index} style={styles.tableRow}>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.name}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.contact}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.3 }]}
                      numberOfLines={2}
                    >
                      {survey.address}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.preferredParty === "Other / अन्य"
                        ? survey.customInputs?.preferredParty
                        : survey.preferredParty}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.aapCandidate === "Other / अन्य"
                        ? survey.customInputs?.aapCandidate
                        : survey.aapCandidate}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.bjpCandidate === "Other / अन्य"
                        ? survey.customInputs?.bjpCandidate
                        : survey.bjpCandidate}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.congressCandidate}
                    </Text>
                    <Text
                      style={[styles.cell, { width: windowWidth * 0.25 }]}
                      numberOfLines={2}
                    >
                      {survey.otherPartyCandidate}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: Colors.PRIMARY,
    padding: 20,
    paddingTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  downloadButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    padding: 10,
    borderRadius: 8,
  },
  downloadText: {
    color: "white",
    marginLeft: 10,
    paddingVertical: 5,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  summaryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  summaryCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "48%",
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#666",
    marginTop: 5,
  },
  analysisContainer: {
    marginBottom: 20,
  },
  analysisCard: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.PRIMARY,
  },
  analysisStat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#444",
    flex: 1,
    paddingRight: 10,
  },
  statValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.PRIMARY,
  },
  tableContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: Colors.PRIMARY,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: Colors.PRIMARY,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  headerCell: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
    padding: 12,
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "white",
  },
  cell: {
    padding: 12,
    fontSize: 14,
  },
  // next level loading container
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default DataScreen;
