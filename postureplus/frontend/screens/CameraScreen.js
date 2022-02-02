import React, { useState, useEffect, useRef } from "react";

//react native
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  Platform,
  Switch,
  TouchableOpacity,
} from "react-native";

//theme redux
import { useSelector } from "react-redux";

//picker
// import RNPickerSelect from 'react-native-picker-select';
// import { Chevron } from 'react-native-shapes';
//React Native Canvas
import Canvas from "react-native-canvas";
import CanvasRenderingContext2D from "react-native-canvas";

//Expo Camera
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import ExpoWebGLRenderingContext from "expo-gl";

//Tensorflow Dependencies
//import * as tf from '@tensorflow/tfjs';
import * as tf from "@tensorflow/tfjs-core";
// import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import {
  drawKeypoints,
  drawSkeleton,
  drawPoint,
  drawSegment,
} from "../components/demo_utils";

//Tensorflow Model
import * as posenet from "@tensorflow-models/posenet";
import * as poseDetection from "@tensorflow-models/pose-detection";

// Register one of the TF.js backends.
import "@tensorflow/tfjs-backend-webgl";

//Import App constant for styling
import { COLORS, SIZES, icons } from "../constant";
import { TextButton } from "../components";
// import { WebView } from 'react-native-webview';

const CameraScreen = ({ navigation, route }) => {
  const { exercise } = route.params;
  const theme = useSelector((state) => state.themeReducer.theme);

  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };
  //------------------------------------------------
  //state variables for image/translation processing
  //------------------------------------------------
  const [hasPermission, setHasPermission] = useState(null);

  //Tensorflow and Permissions
  const [posenetModel, setposenetModel] = useState(null);
  const [frameworkReady, setFrameworkReady] = useState(false);
  const [isStartPose, setIsStartPose] = useState(false);

  //const [moveNetModel, setMoveNetModel] = useState(null);

  //TF Camera Decorator
  const TensorCamera = cameraWithTensors(Camera);

  //RAF ID
  let requestAnimationFrameId = 0;

  const wi = 360;
  const he = 480;

  const context = useRef(CanvasRenderingContext2D);
  const canvas = useRef(Canvas);

  //-----------------------------
  // Run effect once
  // 1. Check camera permissions
  // 2. Initialize TensorFlow
  // 3. Load Mobilenet Model
  //-----------------------------
  function handleCanvas(can) {
    if (can) {
      can.width = wi;
      can.height = he;
      const ctx = can.getContext("2d");
      context.current = ctx;
      canvas.current = can;
      // draw(ctx);

      if (canvas.current != null) {
      }
      // ctx.clearRect(0, 0, wi, he);
    }
  }
  useEffect(() => {
    if (!frameworkReady) {
      (async () => {
        //check permissions
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log(`permissions status: ${status}`);
        setHasPermission(status === "granted");

        //we must always wait for the Tensorflow API to be ready before any TF operation...
        await tf.ready();

        //load the mobilenet model and save it in state
        setposenetModel(await loadposenetModel());

        setFrameworkReady(true);
      })();
    }
  }, []);

  function draw(ctx) {
    ctx.save();
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(wi, he);

    ctx.fill("nonzero");
    ctx.stroke();
  }

  //component will unmount
  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  //Load TF Model
  const loadposenetModel = async () => {
    const model = await posenet.load({
      // inputResolution: { width: wi, height: he },
      inputResolution: { width: 360, height: 480 },
      scale: 0.5,
      // architecture: "MobileNetV1",
      // outputStride: 16,
      // multiplier: 0.75,
      // quantBytes: 2,
    });
    model.estimateSinglePose;
    return model;
  };

  const handleCameraStream = async (imageAsTensors) => {
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;
      const flipHorizontal = Platform.OS === "ios" ? false : true;

      if (!posenetModel || !nextImageTensor)
        throw new Error("Unable to load the model");
      posenetModel
        .estimateSinglePose(nextImageTensor, { flipHorizontal })
        .then((pose) => {
          //draw the canvas
          // for PoseNet
          // draw(context.current);
          drawPose(pose, context.current);
          if (canvas.current != null) {
          }
        })
        .catch((error) => {
          console.error(error);
        });

      requestAnimationFrameId = requestAnimationFrame(loop);
    };
    loop();
  };

  const drawPose = (pose, ctx) => {
    // const flipHorizontalKeypoints = [];
    if (!canvas.current) {
      console.log("NO canvas found");
      return;
    }
    if (!context.current) {
      console.log("NO context found");
      return;
    }

    //clear the previous context in the canvas
    context.current.clearRect(0, 0, wi, he);

    //TODO: Uncommented if the test is wrong_______________________

    console.log("drawing pose...");

    drawKeypoints(pose["keypoints"], 0.5, ctx);
    drawSkeleton(pose["keypoints"], 0.5, ctx);
    context.current.clearRect(0, 0, wi, he);
  };

  function startPosture() {
    setIsStartPose(true);
    //runMovenet();
  }

  function stopPosture() {
    setIsStartPose(false);
    // clearInterval(interval);
  }
  const [isEnabled, setIsEnabled] = useState(false);
  const [text, setText] = useState("Turn on");
  const toggleSwitch = () => {
    if (isEnabled) {
      setText("Turn on");
      stopPosture();
    } else {
      setText("Turn off");
      startPosture();
    }
    setIsEnabled((previousState) => !previousState);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.BG_COLOR,
      }}
    >
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.radius,
          flexDirection: "row",
          top: 20,
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
            fontSize: SIZES.h1,
            lineHeight: 32,
            marginTop: SIZES.padding,
            alignSelf: "center",
            color: theme.TEXT_COLOR,
          }}
        >
          Camera Detector
        </Text>
      </View>
      {/* Render Camera frame and Video */}
      <View
        style={{
          marginTop: SIZES.padding,
          width: wi,
          height: he,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          top: 20,
        }}
      >
        <TensorCamera
          style={{
            width: "100%",
            height: "100%",
          }}
          type={Camera.Constants.Type.front}
          zoom={0}
          cameraTextureHeight={textureDims.height}
          cameraTextureWidth={textureDims.width}
          resizeHeight={he}
          resizeWidth={wi}
          resizeDepth={3}
          onReady={(imageAsTensors) => {
            if (isEnabled) return handleCameraStream(imageAsTensors);
          }}
          autorender={true}
        />
        <Canvas
          style={{
            position: "absolute",
            zIndex: 10000000,
            width: "100%",
            height: "100%",
          }}
          ref={handleCanvas}
        />
      </View>
      <View
        style={{
          flexDirection: "row",
          marginTop: SIZES.padding,
          alignSelf: "center",
        }}
      >
        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.secondary }}
          thumbColor={isEnabled ? COLORS.secondary : "#e4e4e4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{
            marginTop: SIZES.base,
            marginRight: SIZES.base,
            transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
          }}
        />
        <Text
          style={{
            marginTop: 16,
            marginLeft: SIZES.base,
            fontSize: SIZES.h3,
            lineHeight: 22,
            color: theme.TEXT_COLOR,
          }}
        >
          {text}
        </Text>
      </View>

      <TextButton
        label="DONE"
        contentContainerStyle={{
          marginTop: 16,
          marginHorizontal: SIZES.padding,
          borderRadius: SIZES.radius,
          paddingVertical: SIZES.base,
        }}
        labelStyle={{
          fontSize: 20,
        }}
        onPress={() =>
          navigation.navigate("ResultScreen", { exercise: exercise })
        }
      />
    </View>
  );
};
export default CameraScreen;
