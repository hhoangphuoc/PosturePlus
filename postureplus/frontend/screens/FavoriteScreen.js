import React from "react";
import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";

import { Section, VerticalCard } from "../components";
import { SIZES, COLORS, icons, dummydata } from "../constant";

import { useSelector, useDispatch } from "react-redux";
import { addToWishList, removeFromWishList } from "../redux/bookmarkAction";

const FavoriteScreen = ({ navigation }) => {
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

  function renderFavoritesExercises() {
    return (
      <Section
        containerStyle={{
          marginTop: SIZES.padding,
        }}
      >
        {wishlist.length > 0 ? (
          <FlatList
            data={wishlist}
            listKey={`Favorite-Exercises`}
            keyExtractor={(item) => `Favorite-Exercises--${item.id}`}
            showsHorizontalScrollIndicator={false} //disable scroll bar
            contentContainerStyle={{
              marginTop: SIZES.base,
            }}
            //render each exercise card
            renderItem={({ item, index }) => (
              <View>
                <VerticalCard
                  sharedElementPrefix="Favorites"
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
                      sharedElementPrefix: "Favorites",
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
        ) : (
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              top: 200,
              marginHorizontal: SIZES.base,
            }}
          >
            <Text
              style={{
                fontSize: 20,
                lineHeight: 30,
                marginTop: SIZES.base,
                // marginLeft: SIZES.padding,
                color: theme.TEXT_COLOR,
                letterSpacing: 0.5,
              }}
            >
              Your Favorites is empty
            </Text>
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                marginTop: SIZES.base,
                // marginLeft: SIZES.padding,
                color: theme.TEXT_COLOR,
              }}
            >
              Let's fill it with your favorites exercise ^_^
            </Text>
          </View>
        )}
      </Section>
    );
  } //end of favorites list section

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.BG_COLOR,
        paddingBottom: 150,
      }}
    >
      {/* Header */}
      <Text
        style={{
          fontSize: 28,
          lineHeight: 30,
          top: 50,
          marginTop: SIZES.base,
          marginLeft: SIZES.padding,
          color: theme.TEXT_COLOR,
        }}
      >
        Your Favorites
      </Text>

      {/* List of Favorites Cards: */}
      {renderFavoritesExercises()}
    </View>
  );
};

export default FavoriteScreen;
