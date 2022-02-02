import { Text, View, Image } from "react-native";
import React from "react";
import { COLORS, SIZES, FONTS, icons } from "../constant";
import { TouchableOpacity } from "react-native-gesture-handler";

import { useSelector } from "react-redux";

const CameraInstruction = ({ navigation }) => {
  const theme = useSelector((state) => state.themeReducer.theme);
  function renderHeader() {
    return (
      <View
        style={{
          top: 40,
          // position: "absolute",
          width: "100%",
          height: 100,
          flexDirection: "row",
        }}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={{
            width: 45,
            height: 45,
            marginTop: SIZES.padding,
            marginLeft: SIZES.base,
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
            // alignSelf: "center",
            fontSize: SIZES.h2,
            lineHeight: 30,
            justifyContent: "center",
            marginTop: SIZES.padding,
            marginLeft: SIZES.base,
            color: theme.TEXT_COLOR,
          }}
        >
          CAMERA INSTRUCTION
        </Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.BG_COLOR }}>
      {/* Header */}
      {renderHeader()}

      {/* Instruction Image */}
      {/* {renderPoseImage()} */}
      <View
        style={{
          marginTop: 30,
          width: "95%",
          height: 250,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          borderRadius: SIZES.radius,
        }}
      >
        <Image
          resizeMode="cover"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: SIZES.radius,
          }}
          source={icons.poseInstruction}
        />
      </View>

      <View
        style={{
          backgroundColor: COLORS.primary,
          width: "95%",
          height: 50,
          // alignSelf: "center",
          marginTop: 16,
          borderBottomRightRadius: 60,
          borderTopRightRadius: 60,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: SIZES.h2,
            lineHeight: 30,
            marginLeft: SIZES.radius,
            color: COLORS.white,
          }}
        >
          How to set up ?
        </Text>
      </View>

      {/* Detail */}
      <View
        style={{
          flexDirection: "column",
          flex: 1,
          width: "95%",
          height: 250,
          alignSelf: "center",
          marginBottom: 40,
          marginTop: SIZES.radius,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.h3,
            lineHeight: 25,
            color: theme.TEXT_COLOR,
            marginLeft: SIZES.radius,
          }}
        >
          1. Press "Start" to open the camera {`\n`}
          2. Turn on the camera {`\n`}
          3. Set the camera so that it can capture your entire body {`\n`}
          4. Wait until you see the lines on the screen (as image above)
          {`\n`}
          5. Start doing your exercise{`\n`}
          6. Press "Done" when you finish
        </Text>
      </View>
    </View>
  );
};

export default CameraInstruction;
