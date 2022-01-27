//Import Pose Detection library
import * as poseDetection from "@tensorflow-models/pose-detection";
import * as tf from "@tensorflow/tfjs";

//React and React Native components
import React, { useRef, useState, useEffect } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Switch,
} from "react-native";

//backend
import backend from "@tensorflow/tfjs-backend-webgl";

//Import Camera:
import { Camera } from "expo-camera";

//import Webcam from "react-webcam";

import { cameraWithTensors } from "@tensorflow/tfjs-react-native";

//React Native Canvas
import Canvas from "react-native-canvas";
import CanvasRenderingContext2D from "react-native-canvas";

//Import CONSTANTS and Helper function
import {
  POINTS,
  keypointConnections,
  COLORS,
  SIZES,
  icons,
  dummydata,
} from "../constant";
import { drawPoint, drawSegment } from "../constant/postureHelper";
import { TextButton } from "../components";

//Import app components

//_______________________________________________________________________

let skeletonColor = "rgb(255,255,255)";

// let poseList = [
//   'Tree', 'Chair', 'Cobra', 'Warrior', 'Dog',
//   'Shoulderstand', 'Traingle'
// ]

let poseList = [
  "PushUp",
  "KneePushUp",
  // "BandPushUp",
  // "DumbbellFloorPushUp",
  // "TricepsBenchDip",
  // "BandChestPress",
];

let interval;

// flag variable is used to help capture the time when AI just detect
// the pose as correct(probability more than threshold)
let flag = false;

let requestAnimationFrameId = 0;

//Set up the camera
// const TensorCamera = cameraWithTensors(Camera);

// const wi = 360;
// const he = 480;

// let textureDims =
//   Platform.OS == "ios"
//     ? { height: 1920, width: 1080 }
//     : { height: 1200, width: 1600 };

// const context = useRef(CanvasRenderingContext2D);
// const canvasRef = useRef(Canvas);

function TrainingDetection({ navigation, route }) {
  const { exercise } = route.params;

  //const webcamRef = useRef(null);

  const CLASS_NO = {
    PushUp: 0,
    KneePushUp: 1,
    NO_POSE: 2,
  };
  let flag = false;

  //Set up the camera
  const TensorCamera = cameraWithTensors(Camera);

  const wi = 360;
  const he = 480;

  let textureDims =
    Platform.OS == "ios"
      ? { height: 1920, width: 1080 }
      : { height: 1200, width: 1600 };

  const context = useRef(CanvasRenderingContext2D);
  const canvasRef = useRef(Canvas);
  const [hasPermission, setHasPermission] = useState(null);
  const [frameworkReady, setFrameworkReady] = useState(false);
  const [moveNetModel, setMoveNetModel] = useState(null);

  //TODO - REMOVE IF REACT HOOK ERROR _______________________________________
  const [startingTime, setStartingTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [poseTime, setPoseTime] = useState(0);
  const [bestPerform, setBestPerform] = useState(0);
  const [currentPose, setCurrentPose] = useState("PushUp");
  const [isStartPose, setIsStartPose] = useState(false);

  useEffect(() => {
    const timeDiff = (currentTime - startingTime) / 1000;
    if (flag) {
      setPoseTime(timeDiff);
    }
    if ((currentTime - startingTime) / 1000 > bestPerform) {
      setBestPerform(timeDiff);
    }
  }, [currentTime]);

  useEffect(() => {
    setCurrentTime(0);
    setPoseTime(0);
    setBestPerform(0);
  }, [currentPose]);

  //___________________________________________________________________________

  useEffect(() => {
    if (!frameworkReady) {
      (async () => {
        //check permissions
        const { status } = await Camera.requestCameraPermissionsAsync();
        console.log(`permissions status: ${status}`);
        setHasPermission(status === "granted");

        //we must always wait for the Tensorflow API to be ready before any TF operation...
        await tf.ready();

        //load MoveNet
        const detectorConfig = {
          modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
        };
        const detector = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet,
          detectorConfig
        );

        setMoveNetModel(detector);

        setFrameworkReady(true);
      })();
    }
  }, []);

  function handleCanvas(can) {
    if (can) {
      can.width = wi;
      can.height = he;
      const ctx = can.getContext("2d");
      context.current = ctx;
      canvasRef.current = can;
      // draw(ctx);

      if (canvasRef.current != null) {
      }
      if (context.current != null) {
        console.log("No context found");
      }
      console.log("IN HANDLE CANVAS");
      // ctx.clearRect(0, 0, wi, he);
    }
  }

  useEffect(() => {
    return () => {
      cancelAnimationFrame(requestAnimationFrameId);
    };
  }, [requestAnimationFrameId]);

  // const loadMoveNetModel = async () => {
  //   const detectorConfig = {
  //     modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
  //   };
  //   const detector = await poseDetection.createDetector(
  //     poseDetection.SupportedModels.MoveNet,
  //     detectorConfig
  //   );
  //   return detector;
  // };

  const handleCameraStream = (imageAsTensors) => {
    //TODO: Change Posenet to Movenet
    console.log("In Handle Camera Stream");
    if (!isStartPose) return;
    const loop = async () => {
      const nextImageTensor = await imageAsTensors.next().value;

      if (!moveNetModel || !nextImageTensor)
        throw new Error("Unable to load the model");

      moveNetModel
        .estimatePoses(nextImageTensor)
        .then((pose) => {
          console.log("Detecting...");
          detectPose(pose, context.current);
          if (canvasRef.current != null) {
          }
        })
        .catch((error) => {
          console.error(error);
        });
      // interval = setInterval(() => {
      //   detectPose(detector, poseClassifier);
      // }, 100);
      // runMovenet(nextImageTensor, context.current);
      requestAnimationFrameId = requestAnimationFrame(loop);
    };
    loop();
  };

  // Detect skeletons and points _____________________________________________
  function get_center_point(landmarks, left_bodypart, right_bodypart) {
    let left = tf.gather(landmarks, left_bodypart, 1);
    let right = tf.gather(landmarks, right_bodypart, 1);
    const center = tf.add(tf.mul(left, 0.5), tf.mul(right, 0.5));
    return center;
  }

  function get_pose_size(landmarks, torso_size_multiplier = 2.5) {
    let hips_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    let shoulders_center = get_center_point(
      landmarks,
      POINTS.LEFT_SHOULDER,
      POINTS.RIGHT_SHOULDER
    );
    let torso_size = tf.norm(tf.sub(shoulders_center, hips_center));
    let pose_center_new = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center_new = tf.expandDims(pose_center_new, 1);

    pose_center_new = tf.broadcastTo(pose_center_new, [1, 17, 2]);
    // return: shape(17,2)
    let d = tf.gather(tf.sub(landmarks, pose_center_new), 0, 0);
    let max_dist = tf.max(tf.norm(d, "euclidean", 0));

    // normalize scale
    let pose_size = tf.maximum(
      tf.mul(torso_size, torso_size_multiplier),
      max_dist
    );
    return pose_size;
  }

  function normalize_pose_landmarks(landmarks) {
    let pose_center = get_center_point(
      landmarks,
      POINTS.LEFT_HIP,
      POINTS.RIGHT_HIP
    );
    pose_center = tf.expandDims(pose_center, 1);
    pose_center = tf.broadcastTo(pose_center, [1, 17, 2]);
    landmarks = tf.sub(landmarks, pose_center);

    let pose_size = get_pose_size(landmarks);
    landmarks = tf.div(landmarks, pose_size);
    return landmarks;
  }

  function landmarks_to_embedding(landmarks) {
    // normalize landmarks 2D
    landmarks = normalize_pose_landmarks(tf.expandDims(landmarks, 0));
    let embedding = tf.reshape(landmarks, [1, 34]);
    return embedding;
  }

  // const runMovenet = async (nextImageTensor, ctx) => {
  //   // const detectorConfig = {
  //   //   modelType: poseDetection.movenet.modelType.SINGLEPOSE_THUNDER,
  //   // };
  //   // const detector = await poseDetection.createDetector(
  //   //   poseDetection.SupportedModels.MoveNet,
  //   //   detectorConfig
  //   // );

  //   // const poseClassifier = await tf.loadLayersModel(
  //   //   "http://192.168.119.1:8888/api/model"
  //   // );

  //   // const countAudio = new Audio(count);
  //   // countAudio.loop = true;

  //   detectPose(moveNetModel, poseClassifier, nextImageTensor, ctx);
  //   // detectPose(detector, poseClassifier, nextImageTensor,ctx);

  //   // interval = setInterval(() => {
  //   //   detectPose(detector, poseClassifier);
  //   // }, 100);
  // };

  const detectPose = async (pose, ctx) => {
    if (
      // typeof webcamRef.current !== "undefined" &&
      // webcamRef.current !== null &&
      // webcamRef.current.video.readyState === 4
      !canvasRef.current
    ) {
      console.log("NO canvas found");
      return;
    }
    const poseClassifier = await tf.loadLayersModel(
      "http://192.168.119.1:8888/api/model"
    );

    let notDetected = 0;
    // const video = webcamRef.current.video;
    // const video = nextImageTensor;
    // const pose = await detector.estimatePoses(video);
    // const ctx = canvasRef.current.getContext("2d");

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // DRAW SKELETONS FUNCTIONS
    try {
      console.log("Keypoints draw");
      const keypoints = pose[0].keypoints;
      let input = keypoints.map((keypoint) => {
        if (keypoint.score > 0.4) {
          if (
            !(keypoint.name === "left_eye" || keypoint.name === "right_eye")
          ) {
            drawPoint(ctx, keypoint.x, keypoint.y, 8, "rgb(255,255,255)");
            let connections = keypointConnections[keypoint.name];
            try {
              connections.forEach((connection) => {
                let conName = connection.toUpperCase();
                drawSegment(
                  ctx,
                  [keypoint.x, keypoint.y],
                  [keypoints[POINTS[conName]].x, keypoints[POINTS[conName]].y],
                  skeletonColor
                );
              });
            } catch (err) {
              console.log(err);
            }
          }
        } else {
          notDetected += 1;
        }
        console.log("Key point x:" + keypoint.x + "keypoint y:" + keypoint.y);
        return [keypoint.x, keypoint.y];
      });
      if (notDetected > 4) {
        skeletonColor = "rgb(255,255,255)";
        return;
      }
      const processedInput = landmarks_to_embedding(input);
      const classification = poseClassifier.predict(processedInput);

      classification.array().then((data) => {
        console.log(currentPose);
        const classNo = CLASS_NO[currentPose];
        // const classNo = CLASS_NO["PushUp"];
        console.log(data[0][classNo]);
        if (data[0][classNo] > 0.97) {
          if (!flag) {
            //countAudio.play();

            //TODO - REMOVE IF REACT HOOK ERROR____________
            setStartingTime(new Date(Date()).getTime());
            //____________________________________________
            flag = true;
          }
          //TODO - REMOVE IF REACT HOOK ERROR____________
          setCurrentTime(new Date(Date()).getTime());
          //____________________________________________

          skeletonColor = "rgb(0,255,0)";
        } else {
          flag = false;
          skeletonColor = "rgb(255,255,255)";

          // countAudio.pause();
          // countAudio.currentTime = 0;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  //TODO - REMOVE IF REACT HOOK ERROR____________
  function startPosture() {
    setIsStartPose(true);
    //runMovenet();
  }

  function stopPose() {
    setIsStartPose(false);
    clearInterval(interval);
  }

  // if (isStartPose) {
  //   console.log(exercise?.pose);
  //   setCurrentPose(exercise?.pose);

  //________________________________________________

  //ORIGINAL RETURN//____________________________________________________________

  // return (
  //   <View
  //     style={{
  //       backgroundColor: COLORS.white,
  //     }}
  //   >
  //     <TensorCamera
  //       style={{
  //         position: "absolute",
  //         left: 20,
  //         top: 100,
  //         width: wi,
  //         height: he,
  //         transform: [
  //           { rotateY: "180deg" },
  //           // { rotateZ: "45deg" }
  //         ],
  //         // width:"100%",
  //         // height:"100%",
  //       }}
  //       // ref={webcamRef}
  //       type={Camera.Constants.Type.front}
  //       zoom={0}
  //       cameraTextureHeight={textureDims.height}
  //       cameraTextureWidth={textureDims.width}
  //       resizeHeight={he}
  //       resizeWidth={wi}
  //       resizeDepth={3}
  //       onReady={(imageAsTensors) => handleCameraStream(imageAsTensors)}
  //       autorender={true}
  //     />
  //     <Canvas
  //       style={{
  //         position: "absolute",
  //         left: 20,
  //         top: 100,
  //         zIndex: 10000000,
  //         // width: "100%",
  //         // height: "100%",
  //         width: wi,
  //         height: he,
  //         transform: [
  //           { rotateY: "180deg" },
  //           // { rotateZ: "45deg" }
  //         ],
  //       }}
  //       ref={handleCanvas}
  //     />
  //     <View
  //       style={{
  //         top: 50,
  //         flexDirection: "row",
  //       }}
  //     >
  //       {/* <TextButton
  //         label="DONE"
  //         contentContainerStyle={{
  //           marginTop: SIZES.padding,
  //           marginHorizontal: SIZES.padding,
  //           borderRadius: SIZES.radius,
  //           paddingVertical: SIZES.base,
  //         }}
  //         labelStyle={{
  //           fontSize: 20,
  //         }}
  //         // onPress={stopPose}
  //       /> */}
  //       <TextButton
  //         label="DONE"
  //         contentContainerStyle={{
  //           marginTop: SIZES.padding,
  //           marginHorizontal: SIZES.padding,
  //           borderRadius: SIZES.radius,
  //           paddingVertical: SIZES.base,
  //         }}
  //         labelStyle={{
  //           fontSize: 20,
  //         }}
  //         onPress={() =>
  //           navigation.navigate("ResultScreen", { exercise: exercise })
  //         }
  //       />
  //     </View>
  //   </View>
  // );
  //_________________________________________________________________________________
  const [isEnabled, setIsEnabled] = useState(true);
  const [text, setText] = useState("Turn on");
  const toggleSwitch = () => {
    if (isEnabled) {
      setText("Turn on");
      stopPose();
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
      <View
        style={{
          flexDirection: "row",
          top: 30,
          marginTop: SIZES.padding,
          alignSelf: "center",
        }}
      >
        <Switch
          trackColor={{ false: COLORS.lightGray, true: COLORS.lightGray }}
          thumbColor={isEnabled ? COLORS.primary : "#e4e4e4"}
          onValueChange={toggleSwitch}
          value={isEnabled}
          style={{
            marginTop: SIZES.base,
            marginRight: SIZES.base,
            transform: [{ scaleX: 2 }, { scaleY: 1.8 }],
          }}
        />
        <Text
          style={{
            marginTop: 16,
            marginLeft: SIZES.padding,
            fontSize: SIZES.h3,
            lineHeight: 22,
          }}
        >
          {text}
        </Text>
      </View>
      {/* <View
        style={{
          flexDirection: "row",
          top: 30,
          marginTop: SIZES.padding,
          marginHorizontal: 12,
          alignSelf: "center",
        }}
      >
        <TextButton
          label="Start"
          contentContainerStyle={{
            marginRight: SIZES.padding,
            borderRadius: SIZES.radius,
            // paddingVertical: SIZES.base,
            width: 150,
            height: 50,
            color: COLORS.transparentWhite,
          }}
          labelStyle={{
            fontSize: 14,
          }}
          onPress={startPosture}
        />
        <TextButton
          label="Stop"
          contentContainerStyle={{
            marginLeft: SIZES.padding,
            borderRadius: SIZES.radius,
            // paddingVertical: SIZES.base,
            width: 150,
            height: 50,
          }}
          labelStyle={{
            fontSize: 14,
          }}
          onPress={stopPose}
        />
      </View> */}

      <TextButton
        label="DONE"
        contentContainerStyle={{
          top: 30,
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

  //TODO - REMOVE IF REACT HOOK ERROR____________
  // }

  // return (
  //   <View
  //     style={{
  //       backgroundColor: COLORS.white,
  //     }}
  //   >
  //     <TextButton
  //       label="Start Pose"
  //       contentContainerStyle={{
  //         marginTop: SIZES.padding,
  //         marginHorizontal: SIZES.padding,
  //         borderRadius: SIZES.radius,
  //         paddingVertical: SIZES.base,
  //       }}
  //       labelStyle={{
  //         fontSize: 20,
  //       }}
  //       onPress={startPosture}
  //     />
  //   </View>
  // );
  //_______________________________________________
}

export default TrainingDetection;
