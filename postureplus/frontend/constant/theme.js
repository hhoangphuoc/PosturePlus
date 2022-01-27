import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  primary: "#f2404d", // exercise Card theme

  secondary: "#f8706f", // button color

  dark: "#212121", // dark theme
  white: "#ffffff",

  black: "#000000",

  //Text colors
  gray: "#464646",
  gray1: "#363636",
  lightGray: "#dedede",

  transparentWhite: "rgba(255, 255, 255, 0.2)",
  transparentBlack: "rgba(0, 0, 0, 0.4)",
};
export const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 12,
  padding: 24,

  // font sizes
  largeTitle: 40,
  h1: 30,
  h2: 22,
  h3: 16,
  h4: 14,
  body1: 30,
  body2: 22,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height,
};
export const FONTS = {
  largeTitle: { fontFamily: "Roboto-Black", fontSize: SIZES.largeTitle },
  h1: { fontFamily: "Roboto-Black", fontSize: SIZES.h1, lineHeight: 36 },
  h2: { fontFamily: "Roboto-Bold", fontSize: SIZES.h2, lineHeight: 30 },
  h3: { fontFamily: "Roboto-Bold", fontSize: SIZES.h3, lineHeight: 22 },
  h4: { fontFamily: "Roboto-Bold", fontSize: SIZES.h4, lineHeight: 22 },
  body1: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body1,
    lineHeight: 36,
  },
  body2: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body2,
    lineHeight: 30,
  },
  body3: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body3,
    lineHeight: 22,
  },
  body4: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body4,
    lineHeight: 22,
  },
  body5: {
    fontFamily: "Roboto-Regular",
    fontSize: SIZES.body5,
    lineHeight: 22,
  },
};

export const darkTheme = {
  mode: "dark",
  BG_COLOR: COLORS.dark,
  TEXT_COLOR: COLORS.white,
  BG_ICON_COLOR: COLORS.transparentBlack,
  ICON_COLOR: COLORS.white,
};
export const lightTheme = {
  mode: "light",
  BG_COLOR: COLORS.white,
  TEXT_COLOR: COLORS.black,
  BG_ICON_COLOR: COLORS.white,
  ICON_COLOR: COLORS.black,
};

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
