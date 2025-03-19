import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Animated,
  GestureResponderEvent,
} from "react-native";
import {
  useNavigation,
  NavigationProp,
  useTheme,
} from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { COLORS, FONTS, SIZES } from "@/helpers/utils/theme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { wwp } from "@/helpers/utils/size";

interface ListItemProps {
  icon: any;
  coin: string;
  rate: string;
  amount: string;
  subTitle: string;
  abbreviation: string;
  sheet: React.RefObject<any>;
  scrollX: Animated.Value;
  // onPress?: (value: string) => void;
  onPress?: (event: GestureResponderEvent) => void;
}

const ListItem: React.FC<ListItemProps> = ({
  icon,
  coin,
  rate,
  amount,
  subTitle,
  abbreviation,
  sheet,
  scrollX,
  onPress,
}) => {
  const { colors } = useTheme();
  const navigation = useNavigation<NavigationProp<any>>();

  const renderLeftActions = (
    progress: Animated.AnimatedInterpolation<number>,
    dragX: Animated.Value
  ) => {
    return (
      <Animated.View
        style={[
          styles.swipeContainer,
          {
            transform: [{ translateX: dragX }],
          },
        ]}
      >
        <LinearGradient
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0.5 }}
          colors={["#6F4FEF", "#4628FF"]}
          style={styles.gradient}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Deposit")}
            style={styles.swipeBtn}
          >
            <Text style={styles.swipeBtnText}>Deposit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Withdraw")}
            style={styles.swipeBtn}
          >
            <Text style={styles.swipeBtnText}>Withdraw</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sheet.current?.open()}
            style={styles.swipeBtn}
          >
            <Text style={styles.swipeBtnText}>Transfer</Text>
          </TouchableOpacity>
        </LinearGradient>
      </Animated.View>
    );
  };

  return (
    <GestureHandlerRootView>
      {/* <Swipeable renderLeftActions={renderLeftActions}> */}
      <TouchableOpacity
        onPress={onPress}
        style={[
          styles.listItem,
          { borderColor: colors.border, backgroundColor: colors.bgLight },
        ]}
      >
        <View style={styles.leftContainer}>
          <Image style={styles.icon} source={{ uri: icon }} />
          <View>
            <Text style={[styles.coinText, { color: colors.title }]}>
              {coin}
            </Text>

            <View style={{ flexDirection: "row", alignItems: "cente", gap: 5 }}>
              <Text style={[styles.subTitleText, { color: colors.text }]}>
                {abbreviation}
              </Text>
              <Text style={[styles.subTitleText, { color: colors.text }]}>
                {subTitle}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.rightContainer}>
          <Text style={[styles.amountText, { color: colors.title }]}>
            {amount}
          </Text>
          <Text
            style={[
              styles.rateText,
              { color: Number(rate) > 0 ? COLORS.success : COLORS.danger },
            ]}
          >
            %{rate}
          </Text>
        </View>
      </TouchableOpacity>
      {/* </Swipeable> */}
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    marginHorizontal: 15,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderRadius: SIZES.radiusLg,
    marginBottom: 8,
    paddingHorizontal: 14,
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    alignItems: "flex-end",
  },
  icon: {
    height: 35,
    width: 35,
    marginRight: 10,
    resizeMode: "contain",
  },
  coinText: {
    ...FONTS.h6,
    marginBottom: 4,
  },
  subTitleText: {
    ...FONTS.fontSm,
  },
  amountText: {
    ...FONTS.h6,
    marginBottom: 2,
  },
  rateText: {
    ...FONTS.fontSm,
  },
  swipeContainer: {
    flexDirection: "row",
    left: -260,
    marginBottom: 8,
  },
  gradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderTopRightRadius: SIZES.radius,
    borderBottomRightRadius: SIZES.radius,
  },
  swipeBtn: {
    backgroundColor: "rgba(255,255,255,.1)",
    height: 40,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 12,
    marginRight: 5,
  },
  swipeBtnText: {
    ...FONTS.font,
    color: COLORS.white,
    ...FONTS.fontMedium,
  },
});

export default ListItem;
