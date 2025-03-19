import { NavigationContainer } from "@react-navigation/native";
import "./global.css";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AuthenticatedUserCheck from "./src/Index";
import React, { useState, useMemo } from "react";
import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import { COLORS } from "@/helpers/utils/theme";
import themeContext from "@/helpers/utils/themeContext"; // Adjust the import path if necessary

export default function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const authContext = useMemo(
    () => ({
      setDarkTheme: () => setIsDarkTheme(true),
      setLightTheme: () => setIsDarkTheme(false),
    }),
    []
  );

  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: "#ffffff",
      bgColor: "#f5f5f5",
      title: COLORS.title,
      cardbackground: "#fff",
      text: COLORS.text,
      inputBg: "#FBFBFB",
      shadow: "#E3E3E3",
      borderColor: "#E4E4E4",
      bgLight: "#fff",
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: "#18172A",
      bgColor: "#18172A",
      title: "#fff",
      cardbackground: "#15335E",
      text: "#8EA5C8",
      inputBg: "#242041",
      shadow: "#193050",
      borderColor: "#332d60",
      bgLight: "#242041",
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

  return (
    <themeContext.Provider value={authContext}>
      <NavigationContainer theme={theme}>
        <AuthenticatedUserCheck />
      </NavigationContainer>
    </themeContext.Provider>
  );
}
