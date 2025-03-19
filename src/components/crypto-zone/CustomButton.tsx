import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "@/helpers/utils/theme";
// import { COLORS, FONTS, SIZES } from "../Utils/theme";

interface CustomButtonProps {
  title: string;
  onPress?: () => void;
  color?: string;
  btnSm?: boolean;
  btnRounded?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  color,
  btnSm,
  btnRounded,
}) => {
  return (
    <TouchableOpacity activeOpacity={0.75} onPress={onPress}>
      {color ? (
        <View
          style={[
            styles.button,
            { backgroundColor: color },
            btnSm && { height: 40 },
            btnRounded && { borderRadius: 30 },
          ]}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.white }}>{title}</Text>
        </View>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#6F4FEF", "#4628FF"]}
          style={[
            styles.button,
            btnSm && { height: 40 },
            btnRounded && { borderRadius: 30 },
          ]}
        >
          <Text style={{ ...FONTS.h5, color: COLORS.white }}>{title}</Text>
        </LinearGradient>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 48,
    borderRadius: SIZES.radius,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default CustomButton;
