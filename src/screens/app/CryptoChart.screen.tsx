import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Button,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { fontSize, whp, wwp } from "@/helpers/utils/size";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import { COLORS, FONTS, ICONS } from "@/helpers/utils/theme";
import WebView from "react-native-webview";
import homeStyles from "./cryptoChartStyles";
import { hexToRGBA } from "@/helpers/utils/colorHelper";
import { SvgXml } from "react-native-svg";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";

const CryptoChart = ({ route }) => {
  const { colors } = useTheme();
  const theme = useTheme();
  const webViewRef = useRef<WebView>(null);
  const styles = homeStyles();

  const item = route.params; // Extract required properties

  const [coinDetals, setCoinDetails] = useState();
  const navigation = useNavigation<NavigationProp<any>>();

  // State and Options
  const [activeStates, setActiveStates] = useState({
    screen: "Price",
    timeFrame: "15m",
    indicator: "EMA",
    tradingOption: "Order Book",
  });

  const options = {
    screen: ["Price", "Info"],
    timeFrame: ["Time", "15m", "1h", "4h", "1D", "More"],
    indicator: [
      "MA",
      "EMA",
      "BOLL",
      "SAR",
      "MAVOL",
      "MACD",
      "KDJ",
      "RSI",
      "WR",
    ],
    tradingOption: ["Order Book", "Trade"],
  };

  const updateActiveState = (key: string, value: string) => {
    setActiveStates((prev) => ({ ...prev, [key]: value }));
  };

  // Function to send the symbol to the WebView
  const sendSymbol = (symbol: string) => {
    if (webViewRef.current) {
      webViewRef.current.postMessage(symbol);
    }
  };

  useEffect(() => {
    // Send symbol whenever abbreviation changes
    sendSymbol(item.abbreviation + "USDT");
  }, [item.abbreviation]);

  const OrderData = [
    {
      price: "0.6188",
      amount: "14.5k",
      length: "100%",
    },
    {
      price: "0.6109",
      amount: "8.009k",
      length: "75%",
    },
    {
      price: "0.68859",
      amount: "4.588k",
      length: "40%",
    },
    {
      price: "0.6188",
      amount: "14.5k",
      length: "50%",
    },
    {
      price: "0.6188",
      amount: "8.009k",
      length: "20%",
    },
    {
      price: "0.6188",
      amount: "4.588k",
      length: "45%",
    },
  ];
  return (
    <>
      {/* // <ScrollView style={styles.container1}> */}
      <View
        style={[
          styles.CryptoBtnContainer,
          {
            borderBottomColor: colors.borderColor,
          },
        ]}
      >
        {/* <TouchableOpacity
          onPress={() => navigation.goBack()}
        ></TouchableOpacity> */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: wwp(1.5),
            marginLeft: wwp(3),
          }}
        >
          {options.screen.map((title) => (
            <Button
              key={title}
              title={title}
              onPress={() => updateActiveState("screen", title)}
              color={
                title === activeStates.screen ? colors.priSec : colors.title
              }
            ></Button>
          ))}
        </View>
      </View>

      {/* the Card */}
      {activeStates.screen === "Price" && (
        <GestureHandlerRootView>
          <ScrollView style={{ marginBottom: wwp(5) }}>
            <View
              style={{
                backgroundColor: colors.bgLight,
                width: "100%",
                // height: whp(15.5),
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottomWidth: 1,
                  borderColor: colors.borderColor,
                  paddingVertical: whp(2),
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => console.log("List Coin View")}
                    style={{ marginHorizontal: wwp(2.5) }}
                  >
                    <Image
                      style={{
                        height: whp(5),
                        width: whp(5),
                        resizeMode: "contain",
                      }}
                      source={{ uri: item.image }}
                    />
                    {/* <ListViewIcon width={wwp(5)} height={wwp(5)} /> */}
                  </TouchableOpacity>

                  <View style={{ marginTop: -5 }}>
                    <Text style={styles.coinName}>
                      {item.abbreviation}/USDT
                    </Text>

                    <Text
                      style={[styles.cryptoText, { fontSize: fontSize(15) }]}
                    >
                      {item?.currentPrice} USDT
                    </Text>
                    <Text
                      style={{
                        fontSize: fontSize(10),
                        color: colors.title,
                        fontFamily: String(FONTS.font),
                      }}
                    >
                      ${item?.currentPrice}{" "}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.cryptoCard24,
                      {
                        backgroundColor:
                          item.priceChangePercentage24h < 0
                            ? hexToRGBA(COLORS.danger, 0.1)
                            : hexToRGBA(COLORS.success, 0.1),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.smallText,
                        {
                          color:
                            item.priceChangePercentage24h < 0
                              ? COLORS.danger
                              : COLORS.success,
                          fontFamily: String(FONTS.fontSemiBold),
                        },
                      ]}
                    >
                      {item.priceChangePercentage24h > 0
                        ? `+${item.priceChangePercentage24h}`
                        : item.priceChangePercentage24h || "N/A"}
                      %
                    </Text>
                  </View>
                </View>

                <View style={{}}>
                  <View style={styles.rows}>
                    <Text style={styles.smallLabel}>24 High :</Text>
                    <Text style={styles.smallerText}>
                      {item?.currentPrice}{" "}
                    </Text>
                  </View>
                  <View style={styles.rows}>
                    <Text style={styles.smallLabel}>24 Low :</Text>
                    <Text style={styles.smallerText}>
                      {item?.currentPrice}{" "}
                    </Text>
                  </View>
                  <View style={styles.rows}>
                    <Text style={styles.smallLabel}>Turn over :</Text>
                    <Text style={styles.smallerText}>
                      {" "}
                      {item?.fullyDilutedMarketCap}
                    </Text>
                  </View>
                </View>

                {/* <Pressable onPress={() => toggleFavorites(item.name)}> */}
                <Pressable style={{ paddingRight: wwp(1) }}>
                  {/* <StarIcon clicked={isFavorite} width={wwp(5)} height={wwp(5)} /> */}
                </Pressable>
              </View>
            </View>
            {/* the Chart */}
            <View
              style={{
                width: "100%",
                height: whp(45),
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <WebView
                ref={webViewRef}
                source={require("@/assets/chart.html")}
                // source={{
                //     html: atob(CHART_HTML_BASE64), // Decode base64
                //     baseUrl: "https://www.tradingview.com/",
                // }}
                style={{ flex: 1 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
                mixedContentMode="always"
                androidLayerType="hardware"
                setSupportMultipleWindows={false}
                allowsFullscreenVideo={false}
                allowFileAccess={true}
                allowUniversalAccessFromFileURLs={true} // ✅ Add this
                originWhitelist={["*"]}
                onLoadEnd={() => sendSymbol(item.abbreviation + "USDT")}
                onMessage={(event) => {
                  console.log("WebView message:", event.nativeEvent.data);
                }}
              />
            </View>

            {/* -------------------------------------------- */}
            <View
              style={[
                {
                  borderBottomWidth: 1,
                  borderColor: colors.borderColor,
                  marginVertical: wwp(3),
                },
                styles.viewContainer,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 10,
                }}
              >
                <Text
                  style={{
                    ...FONTS.fontLg,
                    ...FONTS.fontMedium,
                    color: colors.title,
                  }}
                >
                  Order Book
                </Text>
                <SvgXml
                  style={{ marginLeft: 5 }}
                  height={12}
                  width={12}
                  fill={COLORS.primary}
                  xml={ICONS.down}
                />
              </View>

              <View style={{ flexDirection: "row", marginHorizontal: -5 }}>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        color: colors.text,
                        ...FONTS.fontMedium,
                      }}
                    >
                      Price
                    </Text>
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        color: colors.text,
                        ...FONTS.fontMedium,
                      }}
                    >
                      Amount
                    </Text>
                  </View>
                  {OrderData.map((data, index) => (
                    <View
                      key={index}
                      style={{
                        height: 22,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: data.length,
                          backgroundColor: theme.dark
                            ? "rgba(103,196,128,.1)"
                            : "#CBFFD9",
                          height: "100%",
                          position: "absolute",
                        }}
                      />
                      <Text
                        style={{
                          ...FONTS.fontSm,
                          fontSize: 11,
                          color: theme.dark ? COLORS.success : "#468069",
                        }}
                      >
                        {data.price}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.fontSm,
                          fontSize: 11,
                          color: colors.title,
                        }}
                      >
                        {data.amount}
                      </Text>
                    </View>
                  ))}
                </View>
                <View style={{ flex: 1, paddingHorizontal: 5 }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginBottom: 5,
                    }}
                  >
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        color: colors.text,
                        ...FONTS.fontMedium,
                      }}
                    >
                      Amount
                    </Text>
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        color: colors.text,
                        ...FONTS.fontMedium,
                      }}
                    >
                      Price
                    </Text>
                  </View>
                  {OrderData.map((data, index) => (
                    <View
                      key={index}
                      style={{
                        height: 22,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          right: 0,
                          width: data.length,
                          backgroundColor: theme.dark
                            ? "rgba(235,87,87,.15)"
                            : "#FFE3E3",
                          height: "100%",
                          position: "absolute",
                        }}
                      />
                      <Text
                        style={{
                          ...FONTS.fontSm,
                          fontSize: 11,
                          color: colors.title,
                        }}
                      >
                        {data.amount}
                      </Text>
                      <Text
                        style={{
                          ...FONTS.fontSm,
                          fontSize: 11,
                          color: theme.dark ? COLORS.danger : "#8F3939",
                        }}
                      >
                        {data.price}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <View
                style={{
                  borderTopWidth: 1,
                  borderColor: colors.borderColor,
                  marginTop: 10,
                  flexDirection: "row",
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
              >
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      ...FONTS.fontMedium,
                      color: COLORS.success,
                    }}
                  >
                    0.6137
                  </Text>
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      ...FONTS.fontMedium,
                      color: colors.text,
                    }}
                  >
                    {" "}
                    0.6137 USD
                  </Text>
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    paddingLeft: 10,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      ...FONTS.fontMedium,
                      color: colors.text,
                    }}
                  >
                    0.000
                  </Text>
                  <Text
                    style={{
                      ...FONTS.fontSm,
                      ...FONTS.fontMedium,
                      color: colors.title,
                    }}
                  >
                    0.0000
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </GestureHandlerRootView>
      )}
      {activeStates.screen === "Info" && (
        <View className="w-full  text-white h-full flex items-center justify-center">
          <Text className="text-3xl" style={{ color: colors.title }}>
            Coming Soon
          </Text>
        </View>
      )}
    </>
  );
};

export default CryptoChart;

const styles = StyleSheet.create({
  CryptoBtnContainer: {
    // backgroundColor: currentColors.background,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    // borderBottomColor: hexToRGBA(currentColors.primary, 0.2),
  },
  chartBaseBtn: {
    paddingHorizontal: wwp(2),
    height: whp(3.5),
    borderRadius: wwp(1.5),
    backgroundColor: "transparent",
  },
});
