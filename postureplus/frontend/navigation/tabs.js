import React from "react";
import { Easing } from "react-native";
// import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { createStackNavigator } from "@react-navigation/stack";
// import {createDrawerNavigator} from '@react-navigation/drawer';

import { View, Text, Image } from "react-native";

import {
  Home,
  SearchScreen,
  FavoriteScreen,
  Profile,
  ExerciseListing,
  ExerciseDetails,
  ExerciseOverview,
  CameraScreen,
  ResultScreen,
  CameraInstruction,
} from "../screens";
import { COLORS, icons, SIZES } from "../constant";
import { useSelector } from "react-redux";
//MAKING THE STACK NAVIGATION BETWEEN PAGES
const Stack = createStackNavigator();
//make animation transition while navigating
const options = {
  title: "EXERCISES LIST",
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: "timing",
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
};
const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: "HOME" }} />
      <Stack.Screen
        name="ExerciseListing"
        component={ExerciseListing}
        options={() => options}
      />
      {/* <Stack.Screen
                name="FilterScreen"
                component={FilterScreen}
            /> */}
      <Stack.Screen
        name="ExerciseOverview"
        component={ExerciseOverview}
        options={{ title: "OVERVIEW" }}
      />
      <Stack.Screen
        name="ExerciseDetails"
        component={ExerciseDetails}
        options={{ title: "DETAILS" }}
      />
      <Stack.Screen
        name="CameraInstruction"
        component={CameraInstruction}
        options={{ title: "INSTRUCTION" }}
      />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ title: "CAMERA" }}
      />
      {/* <Stack.Screen
        name="CameraScreen"
        component={TrainingDetection}
        options={{ title: "CAMERA" }}
      /> */}
      <Stack.Screen
        name="ResultScreen"
        component={ResultScreen}
        options={{ title: "Exercise Results" }}
      />
    </Stack.Navigator>
  );
};

//--------------------------------
//MAKING THE BOTTOM TABS
//--------------------------------
const Tab = createBottomTabNavigator();

const Tabs = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          backgroundColor: theme.BG_ICON_COLOR,
          borderTopColor: "transparent",
          height: 80,
        },
      }}
    >
      <Tab.Screen
        name="POSTURE +"
        component={StackNavigator}
        options={{
          tabBarLabel: "POSTURE +",
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 20,
            marginBottom: SIZES.base,
            color: theme.ICON_COLOR,
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Image
                source={icons.home}
                resizeMode="contain"
                style={{
                  marginTop: SIZES.padding,
                  marginBottom: 4,
                  width: 30,
                  height: 30,
                  tintColor: focused ? COLORS.primary : theme.ICON_COLOR,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 20,
            marginBottom: SIZES.base,
            color: theme.ICON_COLOR,
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.search}
                resizeMode="contain"
                style={{
                  marginTop: SIZES.padding,
                  marginBottom: 4,
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : theme.ICON_COLOR,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          tabBarLabel: "Favorites",
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 20,
            marginBottom: SIZES.base,
            color: theme.ICON_COLOR,
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.bookmark}
                resizeMode="contain"
                style={{
                  marginTop: SIZES.padding,
                  marginBottom: 4,
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : theme.ICON_COLOR,
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: "Profile",
          tabBarLabelStyle: {
            fontSize: 12,
            lineHeight: 20,
            marginBottom: SIZES.base,
            color: theme.ICON_COLOR,
          },
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={icons.profile}
                resizeMode="contain"
                style={{
                  marginTop: SIZES.padding,
                  marginBottom: 4,
                  width: 25,
                  height: 25,
                  tintColor: focused ? COLORS.primary : theme.ICON_COLOR,
                }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
