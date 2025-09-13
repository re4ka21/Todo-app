import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TodoProvider } from "./context/TodoContext";

import TabsNavigation from "./tabs/TabsNavigation";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TodoProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Tabs" component={TabsNavigation} />
        </Stack.Navigator>
      </NavigationContainer>
    </TodoProvider>
  );
}
