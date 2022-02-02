import React, { useState } from "react";
import {
  View,
  ScrollView,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
// import { } from 'react-native-gesture-handler';
import { FONTS, SIZE, COLORS, icons, dummydata, SIZES } from "../constant";

import { VerticalCard, CategoryCard, Section } from "../components";

//use navigation hook to use navigation natively.
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

//_________________________________________________________________

const Home = () => {
  const navigation = useNavigation();
  const theme = useSelector((state) => state.themeReducer.theme);

  function renderHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 90,
          top: 35,
        }}
      >
        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            alignItems: "center",
            justifyContent: "center",
            marginLeft: SIZES.radius,
            marginVertical: SIZES.padding,
            borderRadius: 10,
            marginTop: 12,
            backgroundColor: COLORS.lightGray,
          }}
          onPress={() => navigation.openDrawer()}
        >
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.black,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 44,
            lineHeight: 44,
            letterSpacing: 2.5,
            marginHorizontal: 32,
            marginVertical: SIZES.radius,
            paddingTop: SIZES.base,
            color: theme.TEXT_COLOR,
          }}
        >
          POSTURE +
        </Text>
      </View>
    );
  } //end of header section

  function renderCategories() {
    return (
      <Section
        title="Categories"
        containerStyle={{
          marginTop: SIZES.padding,
        }}
      >
        <FlatList
          horizontal
          data={dummydata.categories}
          listKey="Categories"
          keyExtractor={(item) => `Categories-${item.id}`}
          showHorizontalScrollIndicator={false}
          contentContainerStyle={{
            marginTop: SIZES.radius,
          }}
          renderItem={({ item, index }) => (
            <CategoryCard
              sharedElementPrefix="Home"
              containerStyle={{
                marginLeft: index === 0 ? SIZES.radius : SIZES.base,
                marginRight:
                  index === dummydata.categories.length - 1 ? SIZES.padding : 0,
              }}
              category={item}
              onPress={() =>
                navigation.navigate("ExerciseListing", {
                  category: item,
                  sharedElementPrefix: "Home",
                })
              }
            />
          )}
        />
      </Section>
    );
  }

  function renderRecommendedExercises() {
    return (
      <Section
        title="Recommended"
        containerStyle={{
          marginTop: SIZES.base,
        }}
      >
        <FlatList
          data={dummydata.recommended}
          listKey="Recommended"
          keyExtractor={(item) => `Recommended-${item.id}`}
          showsHorizontalScrollIndicator={false} //disable scroll bar
          contentContainerStyle={{
            marginTop: SIZES.base,
          }}
          //render custom sub-component inside this list.
          renderItem={({ item, index }) => (
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
                  sharedElementPrefix: "Home",
                })
              }
            />
          )}
        ></FlatList>
      </Section>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        paddingBottom: 400,
        backgroundColor: theme.BG_COLOR,
      }}
    >
      {renderHeader()}
      {/* Render Categories */}
      {renderCategories()}

      {/* Render Recommended */}
      {renderRecommendedExercises()}
    </View>
  );
};

export default Home;
