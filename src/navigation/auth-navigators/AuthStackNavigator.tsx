/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import WelcomeScreen from "@/screens/auth/Welcome.screen";
import LoginForm from "@/screens/auth/LoginForm.screen";
import Onboarding from "@/screens/auth/Onboarding";
// import WelcomeScreen from "@/screens/auth/Welcome.screen";
// import LoginForm from "@/screens/auth/LoginForm.screen";

// Welcome Screen

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
// const Stack = createNativeStackNavigator();
const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: true }}
      initialRouteName="Onboarding"
    >
      {/* Welcome Screens */}
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="LoginForm" component={LoginForm} />
    </Stack.Navigator>
  );
};

export default AuthStackNavigator;
