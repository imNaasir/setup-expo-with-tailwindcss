import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  Platform,
  FlatList,
  Button,
  TextInput,
  Pressable,
} from "react-native";
// import "../../../global.css";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Swipeable } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Swiper from "react-native-swiper";
import { COLORS, FONTS, ICONS, IMAGES, SIZES } from "@/helpers/utils/theme";
import ThemeBtn from "@/components/crypto-zone/ThemeBtn";
import BannerCard from "@/components/crypto-zone/BannerCard";
import PortfolioCard from "@/components/crypto-zone/PortfolioCard";
import { whp, wwp } from "@/helpers/utils/size";
import { hexToRGBA } from "@/helpers/utils/colorHelper";
import ButtonContainer from "@/components/crypto-zone/ButtonContainer";
import ListItem from "@/components/crypto-zone/ListItem";
import useCurrenciesStore from "@/stores/useCurrenciesStore";
import { FlexibleModal } from "@/components/modals/FlexibleModal";
import Constants from "expo-constants";
// import { View, Animated, ScrollView, Dimensions } from "react-native";
// const { width: screenWidth } = Dimensions.get("window");
const { width } = Dimensions.get("window");
const HomeScreen = () => {
  const { colors } = useTheme();
  const [listFilteredCoins, setListFilteredCoins] = useState<any>([]);
  const navigation = useNavigation<NavigationProp<any>>();

  const bannerData = [
    {
      id: "1",
      image: IMAGES.welcomeImg,
      title: "Cryptocurrency Exchange",
      subTitle: "Top Most Trusted",
    },
    {
      id: "2",
      image: IMAGES.welcomeImg,
      title: "Cryptocurrency Exchange",
      subTitle: "Top Most Trusted",
    },
    {
      id: "3",
      image: IMAGES.welcomeImg,
      title: "Cryptocurrency Exchange",
      subTitle: "Top Most Trusted",
    },
    {
      id: "4",
      image: IMAGES.welcomeImg,
      title: "Cryptocurrency Exchange",
      subTitle: "Top Most Trusted",
    },
  ];

  const buttons = [
    "Coins",
    "WatchList",
    "Gainers",
    "Losers",
    "New Listing",
    "Favorites",
  ];
  const [activeButtonTitle, setActiveButtonTitle] = useState("Coins");

  const scrollX = useRef(new Animated.Value(0)).current;

  const onCLick = (value: string) => {
    const gainers = currenciesPrice["yiksiCoins"] ?? [];
    console.log("====================================");
    setActiveButtonTitle(value);
    console.log("clicked one", gainers);
    console.log("====================================");
  };
  const getFilteredCrypto = async () => {
    let value = activeButtonTitle;
    const gainers = currenciesPrice["gainers"] ?? [];
    const newListing = currenciesPrice["newListing"] ?? [];
    const losers = currenciesPrice["losers"] ?? [];
    const coins = currenciesPrice["all"] ?? [];
    if (value === "Gainers") setListFilteredCoins(gainers);
    else if (value === "Losers") setListFilteredCoins(losers);
    else if (value === "New Listing") setListFilteredCoins(newListing);
    else if (value === "Coins") setListFilteredCoins(coins);
    else if (value === "WatchList") setListFilteredCoins(null);
    else if (value === "Favorites") setListFilteredCoins(null);
  };

  const refRBSheet = useRef();

  const loadCurrenciesPrice = useCurrenciesStore(
    (state) => state.loadCurrenciesPrice
  );
  const currenciesPrice = useCurrenciesStore((state) => state.currenciesPrice);

  useEffect(() => {
    loadCurrenciesPrice({});
  }, []);

  useEffect(() => {
    getFilteredCrypto();
  }, [currenciesPrice, activeButtonTitle]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [listCoinsInSearch, setListCoinsInSearch] = useState<any>([]);

  const showModal = () => {
    const coins = currenciesPrice["all"] ?? [];
    setListCoinsInSearch(coins);
    setModalVisible(true);
  };

  const [searchValue, setSearchValue] = useState("");

  const filteredCoins = useMemo(() => {
    return listCoinsInSearch
      ? listCoinsInSearch.filter(
          (coin) =>
            coin.name.toLowerCase().includes(searchValue.toLowerCase()) ||
            coin.abbreviation.toLowerCase().includes(searchValue.toLowerCase())
        )
      : [];
  }, [searchValue, listCoinsInSearch]);

  const handlePressedCoinInfo = (value) => {
    console.log(value);
    navigation.navigate("CryptoChart", value);
  };



  return (
    <SafeAreaView style={[styles.viewContainer, , { padding: 0, flex: 1 }]}>
      <View
        style={{
          flex: 1,
          backgroundColor: hexToRGBA(colors.background, 0.1),
        }}
      >
        <View
          style={{
            flexDirection: "row",
            paddingHorizontal: 15,
            paddingTop: 15,
            paddingBottom: 15,
            backgroundColor: COLORS.bgLight,
          }}
        >
          <View style={{ flex: 1 }}>
            <ThemeBtn />
          </View>
          <TouchableOpacity
            onPress={() => console.log("notifications")}
            style={{
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Image
              style={{
                height: 22,
                width: 22,
                tintColor: COLORS.title,
              }}
              source={IMAGES.bell2}
              // source={require("@/assets")}
            />
            <View
              style={{
                height: 8,
                width: 8,
                borderRadius: 8,
                backgroundColor: "#c62b33",
                position: "absolute",
                borderWidth: 2,
                right: 8,
                top: 10,
                borderColor: colors.background,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => console.log("sidebar")}
            style={{
              height: 35,
              width: 35,
              alignItems: "center",
              justifyContent: "center",
              marginLeft: 8,
            }}
          >
            <FeatherIcon size={20} color={COLORS.title} name="grid" />
          </TouchableOpacity>
        </View>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 100 }}
          showsHorizontalScrollIndicator={false}
          // style={{ backgroundColor: "red" }}
        >
          <Swiper
            style={{
              height: Platform.OS === "web" ? 300 : 180,
            }}
            dotColor={COLORS.borderColor}
            activeDotColor={COLORS.primary}
            paginationStyle={{
              bottom: 0,
            }}
          >
            {bannerData.map((data, index) => {
              return (
                <View
                  key={index}
                  style={{
                    paddingHorizontal: 15,
                  }}
                >
                  <BannerCard
                    image={data.image}
                    title={data.title}
                    subTitle={data.subTitle}
                  />
                </View>
              );
            })}
          </Swiper>

          {/* main */}
          <View style={{ flex: 1 }}>
            {/* Button Container */}
            <View style={styles.viewContainer}>
              <ButtonContainer
                buttons={buttons}
                onClick={(value) => onCLick(value)}
              />
            </View>

            {/* list */}
            <ScrollView style={{ flex: 1 }}>
              <View style={[styles.card]}>
                {activeButtonTitle === "WatchList" && (
                  <>
                    <View
                      style={[
                        styles.viewContainer,
                        {
                          marginBottom: wwp(2),
                          paddingHorizontal: wwp(5),
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <Text
                        style={{
                          ...FONTS.fontMedium,
                          color: colors.title,
                        }}
                      >
                        My First Coin Watchlist
                      </Text>
                      <TouchableOpacity
                        style={{
                          height: 26,
                          width: 26,
                          borderRadius: 26,
                          backgroundColor: COLORS.primary,
                          marginRight: 12,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        onPress={showModal}
                      >
                        <FeatherIcon
                          size={16}
                          color={COLORS.white}
                          name={"plus"}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                )}
                {/* <ScrollView style={{ flex: 1 }}> */}
                <FlatList
                  data={listFilteredCoins}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ListItem
                      icon={item.image}
                      coin={item.name}
                      rate={item.priceChangePercentage24h}
                      amount={item.currentPrice}
                      subTitle={item.name}
                      abbreviation={item.abbreviation}
                      sheet={refRBSheet}
                      scrollX={scrollX}
                      onPress={() => handlePressedCoinInfo(item)}
                    />
                  )}
                  contentContainerStyle={{ paddingBottom: 20 }}
                />
                {/* ---------------------serching----------------------------------------------------------------------------------------------- */}

                <>
                  <FlexibleModal isOpen={isModalVisible} withInput={true}>
                    <View
                      style={{
                        backgroundColor: colors.bgLight,
                        // padding: 20,
                        borderRadius: 10,
                        flex: 1,
                        marginTop:
                          Platform.OS === "ios"
                            ? Constants.statusBarHeight + whp(1.5)
                            : Constants.statusBarHeight + whp(3),
                      }}
                    >
                      {/* <Text>Hello</Text> */}

                      <TextInput
                        style={[
                          {
                            borderRadius: 10,
                            paddingHorizontal: 15,
                            height: 48,
                            paddingVertical: 8,
                            fontSize: 15,
                            borderWidth: 1,
                            // borderWidth: 1,
                            // borderColor: "transparent",
                            backgroundColor: colors.inputBg,
                            fontFamily: "Poppins-Regular",
                            color: colors.title,
                            borderColor: colors.borderColor,
                            margin: wwp(4),
                          },
                        ]}
                        value={searchValue}
                        placeholder="Search here..."
                        onChangeText={(value) => setSearchValue(value)}
                      />
                      <View style={{}}>
                        <TouchableOpacity>
                          <Image
                            style={{
                              height: 18,
                              width: 18,
                              resizeMode: "contain",
                            }}
                            source={IMAGES.close}
                          />
                        </TouchableOpacity>
                      </View>
                      <Button
                        title="close Modal"
                        onPress={() => setModalVisible(false)}
                      />

                      <FlatList
                        data={filteredCoins}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                          <ListItem
                            icon={item.image}
                            coin={item.name}
                            rate={item.priceChangePercentage24h}
                            amount={item.currentPrice}
                            subTitle={item.name}
                            abbreviation={item.abbreviation}
                            sheet={refRBSheet}
                            scrollX={scrollX}
                          />
                        )}
                        contentContainerStyle={{ paddingBottom: 20 }}
                      />

                      {/* <Button title="Close Modal" onPress={toggleModal} /> */}
                    </View>
                  </FlexibleModal>
                </>

                {/* -------------------------------------------------------------------------------------------------------------------- */}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {/* <Text style={{ color: "white" }}>Hello</Text> */}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  viewContainer: {
    paddingHorizontal: wwp(2),
    paddingVertical: wwp(2),
    maxWidth: SIZES.container,
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  text: {
    fontSize: 30,
    fontWeight: "bold",
    color: "red",
  },
  card: {
    width: width,
  },
});
