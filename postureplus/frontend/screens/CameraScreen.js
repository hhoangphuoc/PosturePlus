import React, { useState, useEffect, useRef } from "react";

//react native
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";

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

//Tensorflow Dependencies

//import * as tf from '@tensorflow/tfjs';
import * as tf from "@tensorflow/tfjs-core";
// import * as mobilenet from '@tensorflow-models/mobilenet';
import { cameraWithTensors } from "@tensorflow/tfjs-react-native";
import { drawKeypoints, drawSkeleton } from "../components/demo_utils";

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

  //const [moveNetModel, setMoveNetModel] = useState(null);

  //defaults

  //if adding more languages, map codes from this list:
  // https://cloud.google.com/translate/docs/languages

  //TF Camera Decorator
  const TensorCamera = cameraWithTensors(Camera);

  //RAF ID
  let requestAnimationFrameId = 0;

  //performance hacks (Platform dependent)

  // const textureDims = Platform.OS === "ios" ? { width: 1080, height: 1920 } : { width: 600, height: 800 };
  // const tensorDims = { width: 152, height: 200 };
  // const webViewRef = null;

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
      draw(ctx);

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

        //load movenetmodel
        //setMoveNetModel(await loadMoveNetModel());
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
    });
    return model;
  };

  // const loadMoveNetModel = async () => {
  //     const detectorConfig = {modelType: poseDetection.movenet.modelType.SINGLEPOSE_LIGHTNING};
  //     const detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet, detectorConfig);

  //     return detector;
  // }

  const handleCameraStream = (imageAsTensors) => {
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;

      if (!posenetModel || !nextImageTensor)
        throw new Error("Unable to load the model");
      // const pose =

      // const pose = await posenetModel.estimateSinglePose(nextImageTensor)
      posenetModel
        .estimateSinglePose(nextImageTensor)
        .then((pose) => {
          //draw the canvas
          // for PoseNet
          drawPose(pose, context.current);
          if (canvas.current != null) {
          }
        })
        .catch((error) => {
          console.error(error);
        });

      //const poses = await detector.estimatePoses(nextImageTensor);

      // const cntx = context.current;
      //draw(cntx);

      //for MoveNet model
      //drawCanvas(poses,canvas)

      requestAnimationFrameId = requestAnimationFrame(loop);
    };
    loop();
  };

  const drawPose = (pose, ctx) => {
    const flipHorizontalKeypoints = [];
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

    for (const point of pose["keypoints"]) {
      const pointPos = point["position"];
      pointPos.x = canvas.current.width - pointPos.x;
      flipHorizontalKeypoints.push(point);
    }
    // console.log(flipHorizontalKeypoints)
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // console.log(pose["keypoints"]);

    // drawKeypoints(pose["keypoints"], 0.5, ctx);
    // drawSkeleton(pose["keypoints"], 0.5, ctx);

    drawKeypoints(flipHorizontalKeypoints, 0.5, ctx);
    drawSkeleton(flipHorizontalKeypoints, 0.5, ctx);
  };

  // //FUNCTION TO DRAW CAMERA ON CANVAS
  // function renderCamera() {
  //     return (
  //     <View
  //         // style={{
  //         //     top:"10%",
  //         //     marginVertical: SIZES.padding,
  //         //     marginHorizontal: 36,
  //         //     paddingVertical:SIZES.base,
  //         //     alignItems: "center",
  //         //     justifyContent: "center",
  //         //     backgroundColor:COLORS.primary,
  //         //     borderRadius:SIZES.radius,
  //         // }}
  //         style={{
  //             flex: 1,
  //             backgroundColor:COLORS.white
  //         }}
  //     >

  //     </View>
  //     )
  // } // end of the function

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
        // alignItems: 'center',
        // justifyContent: 'center',
        // // height:"100%",
        // // width:"100%",
      }}
    >
      <View
        style={{
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
        }}
      >
        <Text
          style={{
            fontSize: SIZES.h1,
            lineHeight: 30,
            alignSelf: "flex-start",
            top: 50,
          }}
        >
          Camera
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
          top: 50,
        }}
      >
        <TensorCamera
          style={{
            // width: wi,
            // height: he,
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
          onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
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

      <TextButton
        label="DONE"
        contentContainerStyle={{
          top: 50,
          marginTop: SIZES.padding,
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
