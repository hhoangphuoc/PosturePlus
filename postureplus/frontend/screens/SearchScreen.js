import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Modal } from "react-native";

import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

import { FlatList, ScrollView } from "react-native-gesture-handler";
import {
  // FONTS
  SIZES,
  COLORS,
  icons,
  dummydata,
} from "../constant";

import {
  CategoryCard,
  TextButton,
  VerticalCard,
  Section,
  SearchModal,
} from "../components";

//use navigation hook to use navigation natively.
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

//TODO: FIX SEARCH SCREEN - LIKE SPOTIFY

const SearchScreen = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const wishlist = useSelector((state) => state.bookmarkReducer.wishlist);
  const scrollViewRef = React.useRef();

  //search bar
  // const scrollY = useSharedValue(0);
  // const onScroll = useAnimatedScrollHandler((event) => {
  //   scrollY.value = event.contentOffset.y;
  // });

  const navigation = useNavigation();

  // Searching Filter:_________________________________________________________________
  //search Data:
  const [filterData, setFilterData] = useState([]);
  const [masterData, setMasterData] = useState([]);

  //search input:
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData();
    return () => {};
  }, []);

  const fetchData = () => {
    setFilterData(dummydata.exercises);
    setMasterData(dummydata.exercises);
  };

  const searchFilter = (text) => {
    if (text) {
      const newData = masterData.filter((item) => {
        const itemNameData = item.name
          ? item.name.toLowerCase()
          : "".toLowerCase();
        const itemDifficultData = item.difficulty
          ? item.difficulty.toLowerCase()
          : "".toLowerCase();
        const textData = text.toLowerCase();
        return (
          itemNameData.indexOf(textData) > -1 ||
          itemDifficultData.indexOf(textData) > -1
        );
      });
      setFilterData(newData);
      setSearch(text);
    } else {
      setFilterData(masterData);
      setSearch(text);
    }
  };
  //__________________________________________________________________________________

  function renderDifficulties() {
    return (
      <Section
        containerStyle={{
          top: 30,
          marginTop: SIZES.padding,
        }}
      >
        <Text
          style={{
            marginHorizontal: SIZES.padding,
            // ...FONTS.h2
            fontSize: 22,
            lineHeight: 30,
            color: theme.TEXT_COLOR,
          }}
        >
          Difficulties
        </Text>
        <FlatList
          horizontal
          data={dummydata.difficulties}
          listKey="Difficulties"
          keyExtractor={(item) => `Difficulties-${item.id}`}
          showsHorizontalScrollIndicator={false} //disable scroll bar
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <TextButton
              label={item.name}
              contentContainerStyle={{
                paddingVertical: SIZES.radius,
                paddingHorizontal: SIZES.padding,
                marginLeft: index === 0 ? SIZES.radius : SIZES.base,
                marginRight:
                  index === dummydata.difficulties.length - 1
                    ? SIZES.radius
                    : 0,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.primary,
              }}
              labelStyle={{
                color: COLORS.white,
                // ...FONTS.h3
                fontSize: 16,
                lineHeight: 22,
              }}
              onPress={() => {
                if (item.id === 3) {
                  setFilterData(wishlist);
                } else {
                  setFilterData(
                    dummydata.exercises.filter(
                      (a) =>
                        a.difficulty.toLowerCase() === item.name.toLowerCase()
                    )
                  );
                }
              }}
            />
          )}
        />
      </Section>
    );
  }
  function renderExercisesList() {
    return (
      <Section
        title="Exercises"
        containerStyle={{
          top: SIZES.padding,
          marginTop: SIZES.padding,
        }}
      >
        <FlatList
          style={{
            marginTop: SIZES.base,
          }}
          data={filterData}
          keyExtractor={(item) => `Exercises-${item.id}`}
          renderItem={({ item, index }) => (
            <VerticalCard
              sharedElementPrefix="Search"
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
                  sharedElementPrefix: "Search",
                })
              }
            />
          )}
        />
      </Section>
    );
  }
  function renderSearchBar() {
    return (
      <View
        style={[
          {
            // position: "absolute",
            top: 70,
            left: 0,
            right: 0,
            paddingHorizontal: SIZES.padding,
            height: 50,
          },
          // searchBarAnimatedStyle,
        ]}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            width: SIZES.width - SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.lightGray,
          }}
        >
          <Image
            source={icons.search}
            style={{
              marginLeft: SIZES.base,
              width: 25,
              height: 25,
              tintColor: COLORS.black,
            }}
          />
          <TextInput
            style={{
              flex: 1,
              marginLeft: SIZES.base,
              fontSize: 14,
              lineHeight: 22,
            }}
            value={search}
            placeholder="Search for the exercise..."
            placeholderTextColor={COLORS.gray}
            onChangeText={(text) => searchFilter(text)}
          />
        </View>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 350,
        backgroundColor: theme.BG_COLOR,
      }}
    >
      {renderSearchBar()}
      {renderDifficulties()}
      {renderExercisesList()}
    </View>
  );
};

export default SearchScreen;
