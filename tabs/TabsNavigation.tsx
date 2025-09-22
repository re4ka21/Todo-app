import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "./HomeScreen";
import Create from "./CreateScreen";
import Report from "./ReportScreen";
import MoviesScreen from "./MoviesScreen";
const Tab = createBottomTabNavigator();

export default function TabsNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          height: 40,
          backgroundColor: "white",
        },
        tabBarActiveTintColor: "green",
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="CreateTab"
        component={Create}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="add-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ReportTab"
        component={Report}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="alert-circle" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MoviesScreen"
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ size, color }) => (
            <Ionicons name="film-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
