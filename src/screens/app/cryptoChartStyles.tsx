import { StyleSheet } from "react-native";
// import { Font } from "@/helpers/constants/type";
import { useColorScheme } from "@/hooks/useColorScheme";
// import { Colors } from "@/helpers/constants/Colors";
import { fontSize, whp, wwp } from "@/helpers/utils/size";
import { hexToRGBA } from "@/helpers/utils/colorHelper";
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS, SIZES } from "@/helpers/utils/theme";
const homeStyles = () => {
  const { colors } = useTheme();
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.bgLight,
      paddingHorizontal: wwp(2),
      paddingVertical: whp(1),
    },
    container1: {
      flex: 1,
      backgroundColor: colors.bgLight,
      paddingHorizontal: wwp(2),
    },
    imageBackground: {
      width: "100%",
      height: whp(25),
      justifyContent: "center",
      alignItems: "center",
      borderRadius: wwp(5),
    },
    cardContainer: {
      justifyContent: "center",
      alignItems: "center",
      rowGap: whp(1.5),
    },
    text: {
      fontSize: fontSize(14),
      fontWeight: "400",
      color: COLORS.white,
      fontFamily: String(FONTS.font),
    },
    bigText: {
      fontSize: fontSize(25),
      fontWeight: "500",
      color: COLORS.white,
      fontFamily: String(FONTS.fontMedium),
    },
    button: {
      backgroundColor: COLORS.title,
      height: whp(5.5),
    },
    btnText: {
      fontSize: fontSize(14),
      color: colors.primary,
      fontFamily: String(FONTS.fontSemiBold),
    },
    btnContainer: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: whp(1.5),
    },
    listContainer: {
      width: "60%",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: whp(7),
    },
    HomeListBtn: {
      flex: 1,
      backgroundColor: colors.bgLight,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: whp(7),
      borderRadius: wwp(3),
      shadowColor: "#000",
      shadowOpacity: 0.03,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0.5,
    },

    changesContainer: {
      flex: 1,
      backgroundColor: hexToRGBA(COLORS.secondary, 0.05),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: whp(5.5),
      marginVertical: whp(0.7),
      paddingHorizontal: wwp(3),
    },
    indicatorContainer: {
      flex: 1,
      backgroundColor: hexToRGBA(COLORS.secondary, 0.05),
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      height: whp(4),
      paddingHorizontal: wwp(3),
    },
    baseButtonStyle: {
      paddingHorizontal: wwp(2),
      height: whp(3.5),
      borderRadius: wwp(1.5),
      backgroundColor: "transparent",
    },
    chartBaseBtn: {
      paddingHorizontal: wwp(2),
      height: whp(3.5),
      borderRadius: wwp(1.5),
      backgroundColor: "transparent",
    },
    baseBtn2: {
      height: whp(3.5),
      borderRadius: 6,
      backgroundColor: "transparent",
    },
    baseTextStyle: {
      fontSize: fontSize(13),
      fontFamily: String(FONTS.font),
      textAlign: "center",
    },
    smallText: {
      fontSize: fontSize(10),
      fontWeight: "500",
      fontFamily: String(FONTS.fontMedium),
      color: colors.title,
    },
    cryptoCard: {
      backgroundColor: colors.bgLight,
      marginTop: whp(1.5),
      borderTopLeftRadius: wwp(3),
      borderTopRightRadius: wwp(3),
      padding: wwp(4),
      shadowColor: "#000",
      shadowOpacity: 0.03,
      shadowOffset: { width: 0, height: 0 },
      elevation: 0.5,
    },
    wrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: whp(1.5),
    },
    cryptoText: {
      fontSize: fontSize(12),
      color: colors.title,
      fontFamily: String(FONTS.fontSemiBold),
    },
    coinName: {
      fontSize: fontSize(18),
      color: colors.title,
      fontFamily: String(FONTS.fontSemiBold),
    },

    cryptoChange: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: wwp(2.5),
      height: whp(3.5),
      width: wwp(17),
      borderRadius: wwp(1.5),
    },

    cryptoCard24: {
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: wwp(2),
      height: whp(3),
      width: wwp(13),
      borderRadius: 4,
      marginHorizontal: wwp(2.5),
    },

    CryptoBtnContainer: {
      backgroundColor: colors.bgLight,
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: hexToRGBA(colors.primary, 0.2),
    },

    wrapperInfo: {
      backgroundColor: hexToRGBA(colors.primary, 0.02),
      borderRadius: 18,
      paddingHorizontal: wwp(5),
      paddingVertical: whp(2),
      gap: 10,
      marginHorizontal: wwp(2),
    },
    rows: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    row2: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-start",
    },

    cardRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginVertical: 5,
    },

    labelText: {
      fontSize: fontSize(12),
      fontFamily: String(FONTS.font),
      color: hexToRGBA(colors.primary, 0.51),
    },
    valueText: {
      fontSize: fontSize(12),
      fontFamily: String(FONTS.fontBold),
      color: colors.primary,
    },
    infoDate: {
      fontSize: fontSize(10),
      fontFamily: String(FONTS.font),
      color: colors.primary,
      textAlign: "right",
    },
    smallLabel: {
      fontFamily: String(FONTS.fontMedium),
      fontSize: fontSize(9),
      color: colors.title,
    },
    smallerText: {
      fontFamily: String(FONTS.fontSemiBold),
      fontSize: fontSize(9),
      color: colors.primary,
      textAlign: "justify",
    },

    regularText: {
      fontFamily: String(FONTS.fontMedium),
      fontSize: fontSize(12),
      color: hexToRGBA(colors.primary, 0.63),
    },
    linksBtn: {
      width: wwp(45),
      height: whp(5),
      backgroundColor: "transparent",
      borderRadius: 6,
      borderWidth: 1,
      borderColor: hexToRGBA(COLORS.secondary, 0.3),
    },
    linksBtnText: {
      fontFamily: String(FONTS.fontSemiBold),
      fontSize: fontSize(12),
      color: colors.primary,
      textAlign: "center",
    },
    viewContainer: {
      paddingHorizontal: wwp(2),
      paddingVertical: wwp(2),
      maxWidth: SIZES.container,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
    },
  });
};

export default homeStyles;
