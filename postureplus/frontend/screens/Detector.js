import React, { useRef } from 'react';
import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from 'react-webcam';
import { drawKeypoints, drawSkeleton } from '../components/demo_utils';

function Detector() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runPosenet = async() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    console.log(w, h);
    const net = await posenet.load({
      inputResolution:{width:w, height:h},
      scale:0.5
    });

    setInterval(() => {
      detect(net)
    }, 300)
  };

  const detect = async(network) => {
    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState===4) {
        const video = webcamRef.current.video;
        const videoWidth = webcamRef.current.video.videoWidth;
        const videoHeight = webcamRef.current.video.videoHeight;

        webcamRef.current.video.width = videoWidth;
        webcamRef.current.video.height = videoHeight;

        const pose = await network.estimateSinglePose(video);
        console.log(pose);

        drawCanvas(pose, video, videoWidth, videoHeight, canvasRef);
    }
  };

  const drawCanvas = (pose, video, videoWidth, videoHeight, canvas) => {
    if (canvas.current != null){
      const ctx = canvas.current.getContext("2d");
      canvas.current.width = videoWidth;
      canvas.current.height = videoHeight;
      drawKeypoints(pose["keypoints"], 0.5, ctx);
      drawSkeleton(pose["keypoints"], 0.3, ctx);
    }
      
    
  }
  React.useEffect(
    () => {
      runPosenet();
    }, []
  )
  

  return (
    <div className="App">
      <header className="App-header">
        <Webcam 
          ref = {webcamRef}
          style={{ position: "absolute", marginLeft: "auto", marginRight: "auto", left: 0, right: 0, textAlign: "center", zIndex: 9, width: 1080, height: 720 }}
          />
        <canvas 
          ref = {canvasRef}
          style={{ position: "absolute", marginLeft: "auto", marginRight: "auto", left: 0, right: 0, textAlign: "center", zIndex: 9, width: 1080, height: 720 }}
        />
        {/* <button onClick={event =>  window.location.href='/your-href'} style={{zIndex:9999}}>ABS</button> */}
      </header>
    </div>
  );
  
}

export default Detector;