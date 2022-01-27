import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, Image } from "react-native";

import { PersonalDetailCard } from "../components";
import { COLORS, SIZES, icons } from "../constant";

import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../redux/themeAction";
import { lightTheme, darkTheme } from "../constant";

import * as ImagePicker from "expo-image-picker";

const Profile = () => {
  const theme = useSelector((state) => state.themeReducer.theme);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);

  const [isEnabled, setIsEnabled] = useState(false);
  //   const [text, setText] = useState("Turn on");
  const toggleSwitch = () => {
    if (isEnabled) {
      //TODO: Trigger Light Mode
      dispatch(switchTheme(lightTheme));
    } else {
      //TODO: Trigger Dark Mode

      dispatch(switchTheme(darkTheme));
    }
    setIsEnabled((previousState) => !previousState);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          top: 50,
          justifyContent: "space-between",
          marginHorizontal: SIZES.padding,
        }}
      >
        {/* Left icon */}

        {/* Text  */}
        <Text
          style={{
            fontSize: 28,
            lineHeight: 30,
            marginTop: SIZES.radius,
            // alignSelf: "center",
            color: theme.TEXT_COLOR,
            alignSelf: "center",
          }}
        >
          Personal Information
        </Text>
      </View>
    );
  }; //end of header

  const renderProfile = () => {
    return (
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          marginHorizontal: SIZES.padding,
        }}
      >
        {/* Profile Image (TouchableOpacity) */}
        <TouchableOpacity
          style={{
            width: 100,
            height: 100,
            borderRadius: 60,
            top: 80,
            backgroundColor: "rgba(0,0,0,0.2)",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={pickImage}
        >
          {/* Display image if image picker is enabled */}
          {image ? (
            <Image
              source={{ uri: image }}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 60,
              }}
            />
          ) : (
            <Image
              source={icons.profilephoto}
              style={{
                width: 30,
                height: 30,
                left: 3,
                tintColor: theme.ICON_COLOR,
              }}
            />
          )}
        </TouchableOpacity>

        {/* Username */}
        <Text
          style={{
            top: 80,
            fontSize: SIZES.h2,
            fontWeight: "700",
            lineHeight: 22,
            marginTop: 20,
            color: theme.TEXT_COLOR,
          }}
        >
          {/* TODO: Change to dynamic data */}
          Mr. PosturePlus
        </Text>
        <Text
          style={{
            top: 80,
            fontSize: SIZES.h4,
            lineHeight: 22,
            color: theme.TEXT_COLOR,
          }}
        >
          {/* TODO: Change to dynamic data */}
          thebestpostureplus@gmail.com
        </Text>
      </View>
    );
  };

  const renderDarkModeSection = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: SIZES.padding,
          marginBottom: SIZES.radius,
        }}
      >
        <View
          style={{
            flexDirection: "row",

            //   marginHorizontal: SIZES.padding,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: theme.BG_ICON_COLOR,
              borderRadius: 60,
              top: 10,
            }}
          >
            <Image
              source={icons.darkmode}
              resizeMode="contain"
              style={{
                width: 22,
                height: 22,
                tintColor: theme.ICON_COLOR,
              }}
            />
          </View>
          <Text
            style={{
              fontSize: 20,
              lineHeight: 22,
              marginLeft: SIZES.base,
              marginTop: SIZES.radius,
              color: theme.TEXT_COLOR,
            }}
          >
            Dark mode
          </Text>
        </View>

        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.secondary }}
          thumbColor={isEnabled ? COLORS.lightGray : "#e4e4e4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{
            //   marginTop: SIZES.base,
            marginRight: SIZES.base,
          }}
        />
      </View>
    );
  }; //end of dark mode section

  const renderDetailSections = () => {
    return (
      <View
        style={{
          top: 100,
          flexDirection: "column",
          marginTop: SIZES.padding,
        }}
      >
        {renderDarkModeSection()}
        <View
          style={{
            height: 1,
            marginVertical: SIZES.radius,
            marginLeft: SIZES.radius,
            backgroundColor: COLORS.lightGray,
          }}
        />

        <PersonalDetailCard
          icon={icons.birthday}
          iconStyle={{ tintColor: theme.ICON_COLOR }}
          label="Birthday"
          labelStyle={{
            color: theme.TEXT_COLOR,
          }}
          detail="16 Aug, 2002"
        />
        <View
          style={{
            height: 1,
            marginVertical: SIZES.radius,
            marginLeft: SIZES.radius,
            backgroundColor: COLORS.lightGray,
          }}
        />
        <PersonalDetailCard
          icon={icons.measurement}
          iconStyle={{ tintColor: theme.ICON_COLOR }}
          label="Height"
          labelStyle={{
            color: theme.TEXT_COLOR,
          }}
          detail="170cm"
        />
        <View
          style={{
            height: 1,
            marginVertical: SIZES.radius,
            marginLeft: SIZES.radius,
            backgroundColor: COLORS.lightGray,
          }}
        />
        <PersonalDetailCard
          icon={icons.dumbbell}
          iconStyle={{ tintColor: theme.ICON_COLOR }}
          label="Weight"
          labelStyle={{
            color: theme.TEXT_COLOR,
          }}
          detail="70kg"
        />
        <View
          style={{
            height: 1,
            marginVertical: SIZES.radius,
            marginLeft: SIZES.radius,
            backgroundColor: COLORS.lightGray,
          }}
        />
      </View>
    );
  };
  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: COLORS.white,
        backgroundColor: theme?.BG_COLOR,
      }}
    >
      {/* Header */}
      {renderHeader()}

      {/* Profile Image */}
      {renderProfile()}

      {/* Detail Section */}
      {renderDetailSections()}
    </View>
  );
};

export default Profile;
