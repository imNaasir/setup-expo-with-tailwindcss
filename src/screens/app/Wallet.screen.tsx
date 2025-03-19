import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
} from "react-native";
import homeStyles from "./cryptoChartStyles";
import {
  NavigationProp,
  useNavigation,
  useTheme,
} from "@react-navigation/native";
import useCurrenciesStore from "@/stores/useCurrenciesStore";
import { IMAGES } from "@/helpers/utils/theme";
import ListItem from "@/components/crypto-zone/ListItem";
import { wwp } from "@/helpers/utils/size";
// import "../../../global.css";

const Wallet = () => {
  const { colors } = useTheme();
  const theme = useTheme();
  const styles = homeStyles();
  const refRBSheet = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation<NavigationProp<any>>();

  const [searchValue, setSearchValue] = useState("");
  const [listCoinsInSearch, setListCoinsInSearch] = useState<any>([]);

  const loadCurrenciesPrice = useCurrenciesStore(
    (state) => state.loadCurrenciesPrice
  );
  const currenciesPrice = useCurrenciesStore((state) => state.currenciesPrice);

  useEffect(() => {
    loadCurrenciesPrice({});
  }, []);

  useEffect(() => {
    const coins = currenciesPrice["all"] ?? [];
    setListCoinsInSearch(coins);
  }, [currenciesPrice]);

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
          backgroundColor: colors.background,
        }}
      >
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

        {/* <Button title="close Modal" onPress={() => setModalVisible(false)} /> */}

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
              onPress={() => handlePressedCoinInfo(item)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 50 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default Wallet;
