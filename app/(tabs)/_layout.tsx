import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/assets/colors/colors";

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: Colors.main_theme.ACTIVE_ACCENT_COLOR,
        tabBarInactiveTintColor: Colors.main_theme.INACTIVE_ACCENT_COLOR,
        headerStyle: {
          backgroundColor: Colors.main_theme.BACKGROUND_COLOR,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.main_theme.ACTIVE_ACCENT_COLOR,
        tabBarStyle: {
          backgroundColor: Colors.main_theme.BACKGROUND_COLOR,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Languages",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
}
