import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  GestureResponderEvent,
  Dimensions,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from "@/helpers/utils/theme";
import { wwp } from "@/helpers/utils/size";

interface ButtonContainerProps {
  buttons: string[]; // Array of button labels
  onClick?: (value: string) => void; // Updated to return the clicked value
}
const { width } = Dimensions.get("window");
function ButtonContainer({ buttons, onClick }: ButtonContainerProps) {
  const { colors } = useTheme();

  return (
    <View style={{ ...styles.btnContainer, backgroundColor: colors.bgLight }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1, gap: wwp(10) }}
      >
        {buttons.map((btn, i) => (
          <TouchableOpacity
            key={btn}
            style={styles.btn}
            onPress={() => onClick && onClick(btn)}
          >
            <Text
              style={{ ...FONTS.font, ...FONTS.fontMedium, color: colors.text }}
            >
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    height: 45,
    //overflow: 'hidden',
    flexDirection: "row",
    width: "100%",
    borderRadius: 30,
  },
  btn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },

  indicatoryBackground: {
    height: 45,
    width: "100%",
    backgroundColor: COLORS.primary,
    position: "absolute",
    zIndex: -1,
    borderRadius: 30,
  },
});

export default ButtonContainer;
