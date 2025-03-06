import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import Colors from "@/assets/colors/colors";

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        tabBarActiveTintColor: Colors.TEST_PURPLE,
        tabBarInactiveTintColor: Colors.TEST_CREAM,
        headerStyle: {
          backgroundColor: Colors.LIGHT_PURPLE,
        },
        headerShadowVisible: false,
        headerTintColor: Colors.TEST_PURPLE,
        tabBarStyle: {
          backgroundColor: Colors.LIGHT_PURPLE,
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
