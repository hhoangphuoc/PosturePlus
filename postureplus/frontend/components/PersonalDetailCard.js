import React from "react";
import { View, Text, Image } from "react-native";
import { SIZES, COLORS, icons, dummydata } from "../constant";
const PersonalDetailCard = ({
  containerStyle,
  label,
  labelStyle,
  detail,
  detailStyle,
  icon,
  iconStyle,
}) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginHorizontal: SIZES.padding,
        marginTop: SIZES.base,
        ...containerStyle,
      }}
    >
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Image
          source={icon}
          style={{
            width: 22,
            height: 22,
            ...iconStyle,
          }}
        />
        <Text
          style={{
            fontSize: 20,
            lineHeight: 22,
            marginLeft: SIZES.base,
            ...labelStyle,
          }}
        >
          {label}
        </Text>
      </View>

      <Text
        style={{
          fontSize: SIZES.h3,
          lineHeight: 22,
          color: COLORS.secondary,

          ...detailStyle,
        }}
      >
        {detail}
      </Text>
    </View>
  );
};

export default PersonalDetailCard;
