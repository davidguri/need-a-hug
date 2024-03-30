import React from "react";
import { Ionicons } from '@expo/vector-icons';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from "./screens/Home";
import Hugs from "./screens/Hugs";
import Friends from "./screens/Friends";
import Settings from "./screens/Settings";
import Authentication from "./screens/Authentication";

import { colors } from "./constants/colors";

import { auth } from "./firebase";
import { onAuthStateChanged } from 'firebase/auth';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const headerStyles: any = {
  headerStyle: {
    backgroundColor: colors.background,
    elevation: 0,
    shadowOpacity: 0,
    borderBottomWidth: 0,
  },
  headerTintColor: colors.text,
  headerTitleStyle: {
    fontWeight: '900',
    fontSize: 18,
  },
}

const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let icon: any;

        if (route.name === 'Home') {
          icon = <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />;
        } else if (route.name === 'Hugs') {
          icon = <Ionicons name={focused ? 'people' : 'people-outline'} size={size} color={color} />;
        } else if (route.name === 'Friends') {
          icon = <Ionicons name={focused ? 'heart' : 'heart-outline'} size={size} color={color} />;
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
    <Tab.Screen
      name="Home"
      component={Home}
      options={{ headerShown: false }}
    />
    <Tab.Screen
      name="Hugs"
      component={Hugs}
      options={headerStyles}
    />
    <Tab.Screen
      name="Friends"
      component={Friends}
      options={headerStyles}
    />
    <Tab.Screen
      name="Settings"
      component={Settings}
      options={headerStyles}
    />
  </Tab.Navigator>
);

export default function App() {

  const [user, setUser]: any = React.useState();
  const [isAuthenticated, setIsAuthenticated] = React.useState(true);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      setUser(user);
    } else {
      setUser();
    }
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <Stack.Screen name="Auth" component={Authentication} options={{ headerShown: false }} />
        ) : (
          <Stack.Screen
            name="Main"
            component={MainTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
