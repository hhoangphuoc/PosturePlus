import React from "react";

import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";

//  import Video from 'react-native-video';
import { Video } from "expo-av";
import YoutubePlayer from "react-native-youtube-iframe";

import { SIZES, icons, COLORS } from "../constant";

import { HorizontalCard, Section, TextButton } from "../components";
import { useSelector } from "react-redux";

const ExerciseDetails = ({ navigation, route }) => {
  const { selectedExercise } = route.params;
  const theme = useSelector((state) => state.themeReducer.theme);

  const [playVideo, setPlayVideo] = React.useState(false);

  function renderVideoSection() {
    return (
      <View
        style={{
          top: "12%",
          height: 300,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.black,
          marginHorizontal: SIZES.base,
          borderRadius: SIZES.radius,
        }}
      >
        <ImageBackground
          source={selectedExercise?.thumbnail}
          resizeMode="contain"
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Play button */}
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              alignItems: "center",
              justifyContent: "center",
              marginTop: SIZES.base,
              borderRadius: 30,
              backgroundColor: COLORS.transparentBlack,
            }}
            onPress={() => setPlayVideo(true)}
          >
            <Image
              source={icons.playVideo}
              resizeMode="contain"
              style={{
                width: 60,
                height: 60,
                tintColor: COLORS.primary,
              }}
            />
          </TouchableOpacity>
        </ImageBackground>
        {playVideo && (
          <Video
            // ref={video}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: COLORS.black,
              borderRadius: SIZES.radius,
            }}
            source={selectedExercise?.video}
            useNativeControls
            resizeMode="contain"
            isLooping
            // onPlaybackStatusUpdate={status => setStatus(() => status)}
          />
        )}
      </View>
    );
  }

  function renderDescription() {
    return (
      <View
        style={{
          top: "12%",
          flexDirection: "column",
          marginTop: SIZES.base,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: COLORS.primary,
            // marginRight: 60,
            borderTopRightRadius: 60,
            borderBottomRightRadius: 60,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              lineHeight: 30,
              marginVertical: 4,
              marginHorizontal: SIZES.base,
              color: COLORS.white,
            }}
          >
            {selectedExercise?.name}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 12,
            lineHeight: 22,
            marginTop: SIZES.base,
            marginHorizontal: SIZES.padding,
            marginVertical: SIZES.base,
            color: theme.TEXT_COLOR,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          imperdiet nibh vitae ante congue vehicula...
        </Text>

        <TouchableOpacity
          style={{
            marginTop: SIZES.base,
            flexDirection: "row",
            // alignItems: 'center',justifyContent:'center'
          }}
          onPress={() => navigation.navigate("CameraInstruction")}
        >
          <Image
            source={icons.camera}
            style={{
              tintColor: COLORS.primary,
              marginHorizontal: SIZES.padding,
              width: 30,
              height: 30,
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
            marginTop: 40,
            marginHorizontal: 70,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            paddingBottom: 6,
          }}
          labelStyle={{
            fontSize: 20,
            lineHeight: 30,
          }}
          label="Start exercise "
          onPress={() =>
            navigation.navigate("CameraScreen", { exercise: selectedExercise })
          }
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.BG_COLOR,
        // top:"15%"
      }}
    >
      <View style={{ top: 50, flexDirection: "row" }}>
        {/* Back Button */}
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            marginLeft: SIZES.radius,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 40,
              height: 40,
              tintColor: theme.ICON_COLOR,
            }}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: SIZES.h1,
            lineHeight: 30,
            alignSelf: "center",
            // top: 60,
            marginLeft: SIZES.padding,
            color: theme.TEXT_COLOR,
          }}
        >
          Exercise Detail
        </Text>
      </View>

      {renderVideoSection()}
      {renderDescription()}
    </View>
  );
};

export default ExerciseDetails;
