import React, { useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { SharedElement } from "react-native-shared-element";
import { VerticalCard, Section } from "../components";
import {
  // FONTS,
  COLORS,
  SIZES,
  icons,
  dummydata,
} from "../constant";

import { useSelector, useDispatch } from "react-redux";
import { addToWishList, removeFromWishList } from "../redux/bookmarkAction";

const ExerciseListing = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;
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

  function renderHeader() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 180,
          overflow: "hidden",
        }}
      >
        <SharedElement
          id={`${sharedElementPrefix}-categoryCard-bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          {/* background Image */}
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: "100%",
              width: "100%",
              borderBottomLeftRadius: 70,
            }}
          />
          {/* Title */}
          <View
            style={{
              postion: "absolute",
              bottom: 70,
              left: 30,
            }}
          >
            <SharedElement
              id={`${sharedElementPrefix}-categoryCard-title-${category?.id}`}
              style={[StyleSheet.absoluteFillObject]}
            >
              <Text
                style={{
                  position: "absolute",
                  color: COLORS.white,
                  // ...FONTS.h1
                  fontSize: 30,
                  lineHeight: 36,
                }}
              >
                {category?.title}
              </Text>
            </SharedElement>
          </View>
          <SharedElement
            id={`${sharedElementPrefix}-categoryCard-image-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Image
              source={category?.category}
              resizeMode="cover"
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: 200,
                height: 200,
              }}
            />
          </SharedElement>
        </SharedElement>
      </View>
    );
  }

  function renderExercisesByCategory() {
    return (
      <Section
        containerStyle={{
          top: 150,
          marginTop: SIZES.base,
        }}
      >
        <FlatList
          data={dummydata.exercises.filter(
            (a) => a?.category === category?.title
          )}
          listKey={`Exercises-${category?.title}`}
          keyExtractor={(item) => `Exercises-${category?.title}-${item.id}`}
          showsHorizontalScrollIndicator={false} //disable scroll bar
          contentContainerStyle={{
            marginTop: SIZES.base,
          }}
          ListHeaderComponent={
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: SIZES.base,
                marginHorizontal: SIZES.padding,
              }}
            >
              {/* Results Total */}
              <Text
                style={{
                  flex: 1,
                  fontSize: 16,
                  lineHeight: 20,
                  color: theme.TEXT_COLOR,
                }}
              >
                Total Exercises:{" "}
                {
                  dummydata.exercises.filter(
                    (a) => a?.category === category?.title
                  ).length
                }
              </Text>
              {/* Filter button */}
              <TouchableOpacity
                style={{
                  width: 80,
                  height: 40,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 8,
                  backgroundColor: COLORS.primary,
                  flexDirection: "row",
                  marginLeft: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    lineHeight: 22,
                    color: theme.TEXT_COLOR,
                  }}
                >
                  Filter
                </Text>
                <Image
                  source={icons.filter}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 5,
                  }}
                />
              </TouchableOpacity>
            </View>
          }
          //render custom sub-component inside this list.
          renderItem={({ item, index }) => (
            <View>
              <VerticalCard
                sharedElementPrefix="Home"
                containerStyle={{
                  marginVertical: SIZES.padding,
                  marginLeft: SIZES.padding,
                  borderRadius: SIZES.base,
                  marginTop: index === 0 ? 12 : 8,
                }}
                exercise={item}
                onPress={() =>
                  navigation.navigate("ExerciseOverview", {
                    exercise: item,
                    sharedElementPrefix: "ExerciseListing",
                  })
                }
              />
              {isExist(item) ? (
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: "30%",
                    right: "10%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    // selectBookmark(item);
                    onTapRemoveFromWishList(item);
                    item.favorites = false;
                  }}
                >
                  <Image
                    source={icons.bookmark}
                    style={{
                      width: 30,
                      height: 30,
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
                    bottom: "30%",
                    right: "10%",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => {
                    // selectBookmark(item);
                    onTapAddToWishList(item);
                    item.favorites = true;
                  }}
                >
                  <Image
                    source={icons.bookmark}
                    style={{
                      width: 30,
                      height: 30,
                      marginLeft: SIZES.base,
                      marginTop: SIZES.base,
                      tintColor: COLORS.white,
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
          )}
        ></FlatList>
      </Section>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.BG_COLOR,
        flexDirection: "column",
        paddingBottom: 300,
      }}
    >
      {/* Exercise List */}
      {renderExercisesByCategory()}

      {/* Header */}
      {renderHeader()}

      {/* Filter Page */}
      {/* <FilterPage
                filterModalSharedValue1={filterModalSharedValue1}
                filterModalSharedValue2={filterModalSharedValue2}
            /> */}
    </View>
  );
};
ExerciseListing.sharedElements = (route, otherRoute, showing) => {
  const { category, sharedElementPrefix } = route.params;
  return [
    {
      id: `${sharedElementPrefix}-categoryCard-bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-categoryCard-title-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-categoryCard-image-${category?.id}`,
    },
  ];
};

export default ExerciseListing;
