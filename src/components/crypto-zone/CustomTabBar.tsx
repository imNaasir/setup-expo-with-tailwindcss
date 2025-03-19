import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  NavigationHelpers,
  TabNavigationState,
  useTheme,
} from "@react-navigation/native";
import { COLORS, FONTS, IMAGES, SIZES } from "@/helpers/utils/theme";
import {
  BottomTabNavigationEventMap,
  //   NavigationHelpers,
  //   TabNavigationState,
} from "@react-navigation/bottom-tabs";
import { BottomTabDescriptorMap } from "@react-navigation/bottom-tabs/lib/typescript/commonjs/src/types";
import { whp, wwp } from "@/helpers/utils/size";
// import { BottomTabDescriptorMap } from '@react-navigation/bottom-tabs';

// Define types for the props
interface CustomTabBarProps {
  state: TabNavigationState<any>;
  navigation: NavigationHelpers<any, BottomTabNavigationEventMap>;
  descriptors: BottomTabDescriptorMap;
}

const CustomTabBar: React.FC<CustomTabBarProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  const { colors } = useTheme();
  const [routeName, setRouteName] = useState<any>();

  const tabWidth = SIZES.width - 25;
  const circlePosition = useRef(
    new Animated.Value(
      tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5
    )
  ).current;

  const tabW =
    tabWidth < SIZES.container ? tabWidth / 5 : (SIZES.container - 35) / 5;

  const onTabPress = (index: number) => {
    Animated.spring(circlePosition, {
      toValue: index * tabW,
      useNativeDriver: true,
    }).start();
  };

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: state.index * tabW,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <>
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 5,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 5,
          backgroundColor: colors.bgLight,
        }}
      >
        <View
          style={[
            {
              paddingHorizontal: 15,
              paddingVertical: 15,
              maxWidth: SIZES.container,
              width: "100%",
              marginLeft: "auto",
              marginRight: "auto",
            },
            {
              padding: 0,
              backgroundColor: COLORS.bgLight,
              flexDirection: "row",
              zIndex: 3,
            },
          ]}
        >
          <Animated.View
            style={{ transform: [{ translateX: circlePosition }] }}
          >
            <View
              style={{
                width:
                  tabWidth < SIZES.container
                    ? tabWidth / 5
                    : SIZES.container / 5,
                position: "absolute",
                zIndex: 1,
                top: 0,
                left: 0,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  height: Platform.OS === "ios" ? whp(4.7) : whp(5.4),
                  width: Platform.OS === "ios" ? whp(4.7) : whp(5.4),
                  borderRadius: whp(4.7),
                  backgroundColor: COLORS.primary,
                  marginRight: wwp(1),
                }}
              />
            </View>
          </Animated.View>

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.name;

            const isFocused = state.index === index;
            const iconTranslateY = useRef(new Animated.Value(0)).current;
            Animated.timing(iconTranslateY, {
              toValue: isFocused ? 10 : 0,
              duration: 200,
              useNativeDriver: true,
            }).start();

            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate({ name: route.name, merge: true });
                onTabPress(index);
              }
            };
            const dynamicMarginRight =
              route.name === "Home" ? wwp(1.5) : wwp(1); // Adjust as needed

            return (
              <View style={styles.tabItem} key={index}>
                <TouchableOpacity style={styles.tabLink} onPress={onPress}>
                  <Animated.View
                    style={{
                      transform: [{ translateY: iconTranslateY }],
                    }}
                  >
                    <Image
                      style={{
                        height: 18,
                        width: 18,
                        resizeMode: "contain",
                        marginBottom: 4,
                        tintColor: isFocused ? COLORS.white : colors.text,
                      }}
                      source={
                        label === "Home"
                          ? IMAGES.home3
                          : label === "Referral"
                          ? IMAGES.referral2
                          : label === "Profile"
                          ? IMAGES.user2
                          : label === "Trade"
                          ? IMAGES.trade3
                          : label === "Wallet"
                          ? IMAGES.wallet3
                          : undefined
                      }
                    />
                  </Animated.View>
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      color: colors.text,
                      opacity: isFocused ? 0 : 1,
                    }}
                  >
                    {label}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  tabLink: {
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  navText: {
    ...FONTS.fontSm,
  },
});

export default CustomTabBar;
