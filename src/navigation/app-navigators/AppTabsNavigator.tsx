import * as React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";

import { Entypo } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ProfileScreen from "@/src/screens/app/Profile.screen";
import HomeScreen from "@/src/screens/app/Home.screen";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const BottomTapNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: "red",
      }}
    >
      <BottomTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />

      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

function AppTabsNavigator(): JSX.Element {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* Screen wrapping Tab Navigator */}
      <Stack.Screen
        name="Home"
        component={BottomTapNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={
          {
            // header: () => <HeaderProfile title="Notification View" />,
          }
        }
      />
    </Stack.Navigator>
  );
}

export default AppTabsNavigator;
