import React from "react";
import { Image, Text, View, ImageSourcePropType } from "react-native";
import { useTheme } from "@react-navigation/native";
// import { COLORS, FONTS, SIZES } from "../Utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { COLORS, FONTS, SIZES } from "@/helpers/utils/theme";

// Define the types for the props
interface PortfolioCardProps {
  icon: ImageSourcePropType;
  title: string;
  amount: string;
  rate?: string;
}

const PortfolioCard: React.FC<PortfolioCardProps> = (props) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.bgLight,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: SIZES.radiusLg,
        overflow: "hidden",
        paddingVertical: 20,
        borderWidth: 1,
        borderColor: COLORS.borderColor,
      }}
    >
      <LinearGradient
        colors={["#6F4FEF", "#4628FF"]}
        style={{
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 48,
          marginBottom: 12,
          backgroundColor: COLORS.primary,
        }}
      >
        <Image
          style={{
            height: 22,
            width: 22,
            resizeMode: "contain",
          }}
          source={props.icon}
        />
      </LinearGradient>
      <View
        style={{
          paddingHorizontal: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ ...FONTS.fontSm, marginBottom: 2, color: colors.text }}>
          {props.title}
        </Text>
        <Text style={{ ...FONTS.font, color: COLORS.title, ...FONTS.fontBold }}>
          {props.amount}
        </Text>
      </View>
    </View>
  );
};

export default PortfolioCard;
