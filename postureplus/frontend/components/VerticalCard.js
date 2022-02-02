// TEMPLATE FOR CREATING CARDS DISTRIBUTTED VERTICALLY

import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import {
  // FONTS,
  COLORS,
  SIZES,
  icons,
} from "../constant";

// import { IconLabel } from '../components';

//_______________________________________|
//
//TEMPLATE FOR VERTICAL exercise CARD LIST
//_______________________________________|

const VerticalCard = ({
  sharedElementPrefix,
  containerStyle,
  exercise,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        width: "90%",
        height: 300,
        flexDirection: "column",
        backgroundColor: COLORS.primary,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* Exercise Image and Name */}
      <View style={{ marginBottom: SIZES.base }}>
        <SharedElement
          id={`${sharedElementPrefix}-exercise-image-${exercise?.id}`}
        >
          <Image
            source={exercise.image}
            resizeMode="stretch"
            style={{
              width: "95%",
              height: 180,
              marginTop: 4,
              marginLeft: SIZES.base,
              alignContent: "center",
              borderRadius: 5,
            }}
          />
        </SharedElement>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <SharedElement
            id={`${sharedElementPrefix}-exercise-name-${exercise?.id}`}
            // style={[StyleSheet.absoluteFillObject]}
          >
            <Text
              style={{
                position: "relative",
                alignItems: "center",
                marginLeft: SIZES.base,
                marginTop: SIZES.base,
                color: COLORS.white,
                // ...FONTS.h3,
                fontSize: 16,
                lineHeight: 22,
                fontWeight: "bold",
              }}
            >
              {exercise.name}
            </Text>
          </SharedElement>
        </View>
      </View>
      {/* Exercise Info */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          {/* Difficulty */}
          <Text
            style={{
              marginLeft: SIZES.padding,
              // ...FONTS.body4
              fontSize: 14,
              lineHeight: 22,
              color: COLORS.white,
            }}
          >
            Difficulty: {exercise.difficulty}
          </Text>
          {/* Reps */}
          <Text
            style={{
              marginLeft: SIZES.padding,
              // ...FONTS.body4
              fontSize: 14,
              lineHeight: 22,
              color: COLORS.white,
            }}
          >
            Reps: {exercise.reps}
          </Text>
        </View>
        <Image
          source={icons.right_arrow}
          style={{
            width: 35,
            height: 35,
            marginRight: SIZES.base,
            tintColor: COLORS.white,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
export default VerticalCard;
