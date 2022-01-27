import React from "react";
import { View, Text } from "react-native";
import {
  // FONTS,
  SIZES,
} from "../constant";

import { useSelector } from "react-redux";

const Section = ({ containerStyle, title, onPress, children, titleStyle }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  return (
    <View
      style={{
        ...containerStyle,
      }}
    >
      <View
        style={{
          //make the items of component distributed by rows
          flexDirection: "row",
          paddingHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            flex: 1,
            // ...FONTS.h2
            fontSize: 22,
            lineHeight: 30,
            color: theme.TEXT_COLOR,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      </View>

      {children}
    </View>
  );
};

export default Section;
