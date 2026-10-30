import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { analyzeStyleAndFace } from "../../services/gemini";

export default function HomeScreen() {
  const { user } = useUser();
  const [image, setImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);

  // pickimage
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
      base64: true,
    });

    if (!result.canceled && result.assets[0].uri) {
      setImage(result.assets[0].uri);
      setImageBase64(result.assets[0].base64 || null);
      setAnalysisResult(null);
    }
  };

  //  Gemini Vision API
  const handleAnalyze = async () => {
    if (!imageBase64) {
      Alert.alert("Error", "Please select an image first.");
      return;
    }

    setLoading(true);
    try {
      const result = await analyzeStyleAndFace(imageBase64);
      if (!result) {
        throw new Error("AI analysis failed.");
      }
      setAnalysisResult(result);
    } catch (error) {
      console.error("Analysis Error:", error);
      Alert.alert("Error", "Could not analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="sparkles" size={32} color="#D4AF37" />
          <Text style={styles.title}>AI Style & Beauty Advisor</Text>
        </View>
        <Text style={styles.subtitle}>
          Welcome, {user?.firstName || "Fashionista"}! Upload your photo for
          professional AI styling.
        </Text>

        {/* Image Picker Box */}
        {image ? (
          <View style={styles.imageContainer}>
            <Image source={{ uri: image }} style={styles.image} />
            <TouchableOpacity
              style={styles.removeButton}
              onPress={() => {
                setImage(null);
                setImageBase64(null);
                setAnalysisResult(null);
              }}
              disabled={loading}
            >
              <Text style={styles.removeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.uploadBox}
            onPress={pickImage}
            activeOpacity={0.8}
          >
            <Ionicons name="camera-outline" size={50} color="#D4AF37" />
            <Text style={styles.uploadText}>Tap to upload your photo</Text>
          </TouchableOpacity>
        )}

        {/* Analyze Button */}
        {image && !analysisResult && (
          <TouchableOpacity
            style={styles.analyzeButton}
            onPress={handleAnalyze}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#121212" />
            ) : (
              <>
                <Ionicons
                  name="flash"
                  size={20}
                  color="#121212"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.analyzeButtonText}>Analyze with AI</Text>
              </>
            )}
          </TouchableOpacity>
        )}

        {/* Analysis Results Section */}
        {analysisResult && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}> AI Style Report</Text>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Body Shape (የሰውነት ቅርጽ)</Text>
              <Text style={styles.cardValue}>{analysisResult.bodyShape}</Text>
              <Text style={styles.cardAdvice}>
                {analysisResult.clothingAdvice}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Skin Tone & Undertone (የቆዳ ቶን)
              </Text>
              <Text style={styles.cardValue}>{analysisResult.skinTone}</Text>
              <Text style={styles.cardAdvice}>
                {analysisResult.makeupAndJewelry}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>Face Shape (የፊት ቅርጽ)</Text>
              <Text style={styles.cardValue}>{analysisResult.faceShape}</Text>
              <Text style={styles.cardAdvice}>
                {analysisResult.hairAndGlasses}
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  scrollContent: {
    padding: 24,
    alignItems: "center",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D4AF37",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#A0A0A0",
    marginBottom: 25,
    textAlign: "center",
  },
  uploadBox: {
    width: "100%",
    height: 220,
    borderWidth: 2,
    borderColor: "#D4AF37",
    borderStyle: "dashed",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
  },
  uploadText: {
    marginTop: 15,
    fontSize: 16,
    color: "#D4AF37",
    fontWeight: "600",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 260,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333",
    resizeMode: "cover",
  },
  removeButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#2A1212",
    borderWidth: 1,
    borderColor: "#ff4d4d",
    borderRadius: 8,
  },
  removeButtonText: {
    color: "#ff4d4d",
    fontWeight: "bold",
    fontSize: 13,
  },
  analyzeButton: {
    flexDirection: "row",
    marginTop: 20,
    backgroundColor: "#D4AF37",
    padding: 16,
    borderRadius: 12,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#D4AF37",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  analyzeButtonText: {
    color: "#121212",
    fontSize: 16,
    fontWeight: "bold",
  },
  resultsContainer: {
    width: "100%",
    marginTop: 30,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D4AF37",
    marginBottom: 15,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
  },
  cardLabel: {
    fontSize: 14,
    color: "#D4AF37",
    fontWeight: "600",
    marginBottom: 4,
  },
  cardValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  cardAdvice: {
    fontSize: 14,
    color: "#B0B0B0",
    lineHeight: 20,
  },
});
