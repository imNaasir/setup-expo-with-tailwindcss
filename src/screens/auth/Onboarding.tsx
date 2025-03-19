import React, { useRef } from "react";
import {
  Animated,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useTheme } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { COLORS, FONTS, IMAGES, SIZES } from "@/helpers/utils/theme";
import CustomButton from "@/components/crypto-zone/CustomButton";
import { GlobalStyleSheet } from "@/helpers/utils/styleSheet";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface OnboardingProps extends NativeStackScreenProps<any, "Onboarding"> {}

interface SlideData {
  image: any;
  title: string;
  desc: string;
}

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const { colors } = useTheme();

  const DATA: SlideData[] = [
    {
      image: IMAGES.welcomeImg,
      title: "Welcome To CryptoZone",
      desc: "Easiest way to track your multiple \n crypto portfolios",
    },
    {
      image: IMAGES.welcomeImg2,
      title: "Welcome To CryptoZone",
      desc: "Easiest way to track your multiple \n crypto portfolios",
    },
    {
      image: IMAGES.welcomeImg3,
      title: "Welcome To CryptoZone",
      desc: "Easiest way to track your multiple \n crypto portfolios",
    },
  ];

  const scrollValue = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={[styles.container]}>
        <ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollValue } } }],
            { useNativeDriver: false }
          )}
        >
          {DATA.map((data, index) => (
            <View style={styles.slideItem} key={index}>
              <View style={styles.imageContainer}>
                <LinearGradient
                  colors={[colors.background, colors.background]}
                  style={styles.gradientBackground}
                />
                <Image style={styles.image} source={data.image} />
              </View>
              <Text
                style={{ ...FONTS.h3, color: COLORS.title, marginBottom: 8 }}
              >
                {data.title}
              </Text>
              <Text
                style={{
                  ...FONTS.fontLg,
                  color: COLORS.text,
                  textAlign: "center",
                }}
              >
                {data.desc}
              </Text>
            </View>
          ))}
        </ScrollView>
        <View style={styles.indicatorContainer} pointerEvents="none">
          {DATA.map((_, i) => (
            <Indicator key={i} i={i} scrollValue={scrollValue} />
          ))}
        </View>
      </View>
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
          styles.buttonContainer,
        ]}
      >
        <CustomButton
          onPress={() => navigation.navigate("SignIn")}
          title="Get started"
        />
      </View>
    </SafeAreaView>
  );
};

interface IndicatorProps {
  i: number;
  scrollValue: Animated.Value;
}

const Indicator: React.FC<IndicatorProps> = ({ i, scrollValue }) => {
  const { colors } = useTheme();

  const translateX = scrollValue.interpolate({
    inputRange: [
      -SIZES.width + i * SIZES.width,
      i * SIZES.width,
      SIZES.width + i * SIZES.width,
    ],
    outputRange: [-20, 0, 20],
  });

  return (
    <View style={[styles.indicator, { backgroundColor: Colors.borderColor }]}>
      <Animated.View
        style={[styles.activeIndicator, { transform: [{ translateX }] }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideItem: {
    width: SIZES.width,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    paddingBottom: 60,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  gradientBackground: {
    position: "absolute",
    height: 320,
    width: 320,
    borderRadius: 300,
  },
  image: {
    height: 250,
    width: 250,
    resizeMode: "contain",
    marginBottom: 25,
  },
  indicatorContainer: {
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
    flexDirection: "row",
  },
  indicator: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    overflow: "hidden",
  },
  activeIndicator: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  buttonContainer: {
    padding: 30,
    width: "100%",
  },
});

export default Onboarding;
