import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthenticatedUserCheck from "./src/Index";

export default function App() {
  return (
    <NavigationContainer>
      <AuthenticatedUserCheck />
    </NavigationContainer>
  );
}
