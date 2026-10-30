import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#D4AF37",
        tabBarInactiveTintColor: "#666",
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopColor: "#333",
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        headerStyle: {
          backgroundColor: "#121212",
        },
        headerTintColor: "#D4AF37",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Outfit AI",
          headerTitle: "WardrobeAI Hub",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shopping"
        options={{
          title: "My Wardrobe",
          headerTitle: "My Wardrobe",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-handle-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
