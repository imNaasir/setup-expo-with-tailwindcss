import React, { useContext } from "react";
import { useTheme } from "@react-navigation/native";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import themeContext from "@/helpers/utils/themeContext";
import { COLORS, IMAGES } from "@/helpers/utils/theme";
// import { COLORS, IMAGES } from '../Utils/theme';
// import themeContext from '../Utils/themeContext';

// Define types for the theme context
interface ThemeContextType {
  setDarkTheme: () => void;
  setLightTheme: () => void;
}

const ThemeBtn: React.FC = () => {
  const { colors } = useTheme();
  const theme = useTheme();

  // Use the theme context
  const { setDarkTheme, setLightTheme } = useContext(themeContext) || {
    setDarkTheme: () => {},
    setLightTheme: () => {},
  };

  // If theme context is undefined, throw an error
  if (!setDarkTheme || !setLightTheme) {
    throw new Error("Theme context is not defined");
  }

  const offset = useSharedValue(0);
  const opacityDark = useSharedValue(0);
  const opacityLight = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  if (theme.dark) {
    offset.value = withSpring(34);
    opacityDark.value = withTiming(1);
    opacityLight.value = withTiming(0);
  } else {
    offset.value = withSpring(0);
    opacityLight.value = withTiming(1);
    opacityDark.value = withTiming(0);
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (theme.dark) {
          setLightTheme();
        } else {
          setDarkTheme();
        }
      }}
      style={styles.container}
    >
      <Animated.View style={[animatedStyles, styles.animatedView]} />
      <View style={styles.iconContainer}>
        <Image
          source={IMAGES.sun}
          style={{
            height: 16,
            width: 16,
            tintColor: theme.dark ? colors.text : COLORS.title,
          }}
        />
      </View>
      <View style={styles.iconContainer}>
        <Image
          source={IMAGES.night}
          style={{
            height: 14,
            width: 14,
            tintColor: theme.dark ? COLORS.white : colors.text,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};

// Styles using StyleSheet for better readability and performance
const styles = StyleSheet.create({
  container: {
    height: 34,
    width: 68,
    borderRadius: 17,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.bgLight, // Use the colors dynamically
    shadowColor: "rgba(0,0,0,.3)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  animatedView: {
    height: 28,
    width: 28,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 3,
    left: 3,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ThemeBtn;
