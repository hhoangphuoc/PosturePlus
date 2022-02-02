import React, { useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Switch,
} from "react-native";

import { SharedElement } from "react-native-shared-element";

import { TextButton } from "../components";

import {
  // FONTS,
  COLORS,
  SIZES,
  icons,
} from "../constant";
// import Detector from './Detector';
import { useSelector, useDispatch } from "react-redux";
import { addToWishList, removeFromWishList } from "../redux/bookmarkAction";

const ExerciseOverview = ({ navigation, route }) => {
  const { exercise, sharedElementPrefix } = route.params;
  const theme = useSelector((state) => state.themeReducer.theme);
  const wishlist = useSelector((state) => state.bookmarkReducer.wishlist);
  const dispatch = useDispatch();

  const onTapAddToWishList = (exercise) => {
    console.log("adding to wishlist");
    dispatch(addToWishList(exercise));
  };

  const onTapRemoveFromWishList = (exercise) => {
    console.log("removing from wishlist");
    if (wishlist.filter((item) => item.id === exercise.id).length > 0) {
      dispatch(removeFromWishList(exercise));
    }
  };

  const isExist = (exercise) => {
    if (wishlist.filter((item) => item.id === exercise.id).length > 0) {
      return true;
    }
    return false;
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.BG_COLOR,
      }}
    >
      <Text
        style={{
          fontSize: SIZES.h1,
          lineHeight: 30,
          alignSelf: "center",
          top: 60,
          color: theme.TEXT_COLOR,
        }}
      >
        Exercise Overview
      </Text>
      <SharedElement
        id={`${sharedElementPrefix}-exercise-name-${exercise?.id}`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View
          backgroundColor={COLORS.primary}
          style={{
            marginHorizontal: SIZES.base,
            borderRadius: 20,
            height: "53%",
            top: "15%",
          }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                // ...FONTS.h2,
                fontSize: 24,
                lineHeight: 30,
                color: COLORS.white,
                marginTop: 12,
                marginLeft: SIZES.padding,
              }}
            >
              {exercise?.name}
            </Text>
          </View>

          <Text
            style={{
              // ...FONTS.body4,
              fontSize: 14,
              lineHeight: 22,
              marginLeft: SIZES.padding,
              marginTop: SIZES.base,
              color: COLORS.white,
            }}
          >
            Difficulty: {exercise?.difficulty}
          </Text>
          <Text
            style={{
              // ...FONTS.body4,
              fontSize: 14,
              lineHeight: 22,
              marginLeft: SIZES.padding,
              color: COLORS.white,
            }}
          >
            Reps: {exercise?.reps}
          </Text>
        </View>
      </SharedElement>
      <SharedElement
        id={`${sharedElementPrefix}-exercise-image-${exercise?.id}`}
        style={[StyleSheet.absoluteFillObject]}
      >
        <View
          style={{
            // marginHorizontal:SIZES.base,
            borderRadius: SIZES.padding,
            alignItems: "center",
            flex: 1,
            top: "27%",
          }}
        >
          <Image
            source={exercise?.image}
            resizeMode="stretch"
            style={{
              marginVertical: SIZES.padding,
              width: "95%",
              height: 300,
            }}
          />
        </View>
      </SharedElement>

      <SharedElement
        id={`${sharedElementPrefix}-exerciseBookmark-${exercise?.id}`}
        style={[StyleSheet.absoluteFillObject]}
      >
        {isExist(exercise) ? (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: "15%",
              right: "5%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              onTapRemoveFromWishList(exercise);
            }}
          >
            <Image
              source={icons.bookmark}
              style={{
                width: 45,
                height: 45,
                marginLeft: SIZES.base,
                marginTop: SIZES.base,
                tintColor: "#ffbf00",
              }}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              position: "absolute",
              top: "15%",
              right: "5%",
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => {
              onTapAddToWishList(exercise);
            }}
          >
            <Image
              source={icons.bookmark}
              style={{
                width: 45,
                height: 45,
                marginLeft: SIZES.base,
                marginTop: SIZES.base,
                tintColor: COLORS.white,
              }}
            />
          </TouchableOpacity>
        )}
      </SharedElement>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: "70%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() =>
          navigation.navigate("ExerciseDetails", {
            selectedExercise: exercise,
          })
        }
      >
        <Image
          source={icons.help}
          style={{
            marginHorizontal: SIZES.padding,
            width: 36,
            height: 36,
            tintColor: theme.ICON_COLOR,
          }}
        />
        <Text
          style={{
            color: theme.TEXT_COLOR,
          }}
        >
          See detailed instructions
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          position: "absolute",
          top: "76%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => navigation.navigate("CameraInstruction")}
      >
        <Image
          source={icons.camera}
          style={{
            tintColor: COLORS.primary,
            marginHorizontal: SIZES.padding,
            width: 36,
            height: 36,
          }}
        />
        <Text
          style={{
            color: theme.TEXT_COLOR,
          }}
        >
          Learn more about Camera Assistant
        </Text>
      </TouchableOpacity>
      <TextButton
        contentContainerStyle={{
          marginVertical: SIZES.padding,
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          top: "76%",
        }}
        labelStyle={{
          fontSize: SIZES.h2,
          lineHeight: 28,
        }}
        label="Start"
        onPress={() =>
          navigation.navigate("CameraScreen", { exercise: exercise })
        }
      />
    </View>
  );
};
ExerciseOverview.sharedElements = (route, otherRoute, showing) => {
  const { exercise, sharedElementPrefix } = route.params;
  return [
    {
      id: `${sharedElementPrefix}-exercise-name-${exercise?.id}`,
    },
    {
      id: `${sharedElementPrefix}-exercise-image-${exercise?.id}`,
    },
    {
      id: `${sharedElementPrefix}-exerciseBookmark-${exercise?.id}`,
    },
  ];
};

export default ExerciseOverview;
