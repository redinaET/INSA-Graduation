import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getShoppingAdvice } from "../../services/gemini";

export default function ShoppingScreen() {
  const { user } = useUser();
  const [shoppingQuery, setShoppingQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [adviceResult, setAdviceResult] = useState<any>(null);

  const handleGetShoppingAdvice = async () => {
    if (!shoppingQuery.trim()) {
      Alert.alert(
        "Error",
        "Please enter what you want to buy (e.g., Formal jacket, casual shirt).",
      );
      return;
    }

    setLoading(true);
    try {
      const userProfile = {
        bodyShape: "Standard / Custom",
        skinTone: "Matched with user tone",
        faceShape: "Standard",
      };

      const result = await getShoppingAdvice(userProfile, shoppingQuery);
      if (!result) {
        throw new Error("Failed to get shopping advice.");
      }
      setAdviceResult(result);
    } catch (error) {
      console.error("Shopping Advisor Error:", error);
      Alert.alert("Error", "Could not fetch shopping advice. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Ionicons name="bag-handle-outline" size={32} color="#D4AF37" />
          <Text style={styles.title}>AI Shopping Advisor</Text>
        </View>
        <Text style={styles.subtitle}>
          Planning to buy something new? Tell AI what you are looking for, and
          get personalized styling advice.
        </Text>

        {/* Input Box */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>
            What are you planning to buy? (ምን ልትገ አስበዋል?)
          </Text>
          <TextInput
            style={styles.textInput}
            value={shoppingQuery}
            onChangeText={setShoppingQuery}
            placeholder="e.g., A formal business suit, winter jacket, casual wedding outfit"
            placeholderTextColor="#666"
            multiline
          />
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleGetShoppingAdvice}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#121212" />
          ) : (
            <>
              <Ionicons
                name="sparkles"
                size={20}
                color="#121212"
                style={{ marginRight: 8 }}
              />
              <Text style={styles.actionButtonText}>
                Get AI Shopping Advice
              </Text>
            </>
          )}
        </TouchableOpacity>

        {/* Results Section */}
        {adviceResult && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>🛍️ Recommended For You</Text>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Recommended Item Types (የልብስ ዓይነት)
              </Text>
              <Text style={styles.cardValue}>
                {adviceResult.recommendedItemTypes}
              </Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Best Colors for You (የሚመጥኑ ከለሮች)
              </Text>
              <Text style={styles.cardValue}>{adviceResult.bestColors}</Text>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardLabel}>
                Expert Shopping Tips (የግዢ ማስታወሻ)
              </Text>
              <Text style={styles.cardAdvice}>{adviceResult.shoppingTips}</Text>
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
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: "#D4AF37",
    fontWeight: "600",
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#1E1E1E",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 12,
    padding: 16,
    color: "#FFF",
    fontSize: 16,
    height: 100,
    textAlignVertical: "top",
  },
  actionButton: {
    flexDirection: "row",
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
  actionButtonText: {
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
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  cardAdvice: {
    fontSize: 14,
    color: "#B0B0B0",
    lineHeight: 20,
  },
});
