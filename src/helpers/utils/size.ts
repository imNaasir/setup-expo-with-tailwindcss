import { Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");
const { width: screenWidth, height: screenHeight } = Dimensions.get("screen");

export const wwp = (percentage: number) => {
  return (percentage / 100) * windowWidth;
};

export const whp = (percentage: number) => {
  return (percentage / 100) * windowHeight;
};

export const swp = (percentage: number) => {
  return (percentage / 100) * screenWidth;
};

export const shp = (percentage: number) => {
  return (percentage / 100) * screenHeight;
};
