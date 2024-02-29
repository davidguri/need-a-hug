import React from "react";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./screens/Home";
import Settings from "./screens/Settings";

import { colors } from "./constants/colors"

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon;

        if (route.name === 'Home') {
          icon = <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
        } else if (route.name === 'SendHug') {
          icon = <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />;
        } else if (route.name === 'ReceiveHug') {
          icon = <Ionicons name={focused ? 'heart-circle' : 'heart-circle-outline'} size={size} color={color} />;
        } else if (route.name === 'Settings') {
          icon = <Ionicons name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />;
        }

        return icon;
      },
      tabBarActiveTintColor: colors.primary,
      tabBarInactiveTintColor: colors.text,
      tabBarStyle: { backgroundColor: colors.background, borderTopWidth: 0 },
      tabBarLabelStyle: { fontWeight: 'bold', color: colors.text },
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 18,
        },
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Auth Flow */}
        {/* Add screens for authentication flow if needed */}

        {/* Main App Flow */}
        <Stack.Screen options={{ headerShown: false }} name="Main" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
