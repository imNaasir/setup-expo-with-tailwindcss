import React from "react";
import {
  createBottomTabNavigator,
  BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { View, Platform, StatusBar, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

import CustomTabBar from "@/components/crypto-zone/CustomTabBar";
import TradeScreen from "@/screens/app/Trade.screen";
import ReferralScreen from "@/screens/app/Refferal";
import HomeScreen from "@/screens/app/Home.screen";
import Wallet from "@/screens/app/Wallet.screen";
import ProfileScreen from "@/screens/app/Profile.screen";
import { whp } from "@/helpers/utils/size";
import { COLORS } from "@/helpers/utils/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CryptoChart from "@/screens/app/CryptoChart.screen";
import Notifications from "@/screens/app/Notifications.screen";

type RootTabParamList = {
  Trade: undefined;
  Referral: undefined;
  Home: undefined;
  Wallet: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const theme = useTheme();
  const { colors } = theme;

  return (
    <>
      <StatusBar
        backgroundColor={theme.dark ? colors.background : colors.background}
        barStyle={theme.dark ? "light-content" : "dark-content"}
      />

      <View style={styles.shadowContainer}>
        <Tab.Navigator
          initialRouteName="Home"
          tabBar={(props) => <CustomTabBar {...props} />}
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              // borderWidth: 5,
            },
          }}
        >
          <Tab.Screen name="Trade" component={TradeScreen} />
          <Tab.Screen name="Referral" component={ReferralScreen} />
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Wallet" component={Wallet} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </View>
    </>
  );
};
// AppNavigator
const BottomTapNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      {/* Screen wrapping Tab Navigator */}
      <Stack.Screen
        name="Home"
        component={AppNavigator}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="CryptoChart"
        component={CryptoChart}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5, // For Android
    backgroundColor: "red",
  },
});

export default BottomTapNavigator;
