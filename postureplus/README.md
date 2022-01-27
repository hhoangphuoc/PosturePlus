# Posture Plus

Posture+ Mobile App


## 1) Dependencies

For installing all the dependencies required using:
```
npm install 
```


### a) Front-end

> For camera and Tensorflow detection:

- Expo camera
```
expo install expo-camera
expo install expo-constants
expo install expo-permissions
expo install expo-gl-cpp
expo install expo-gl
```

- React native Canvas
```
npm install react-native-canvas
```
- Tensorflow and Tensorflow React Native
[Link how to install and setup tensorflow RN](https://www.npmjs.com/package/@tensorflow/tfjs-react-native)

> Install Tensorflow Dependencies
```
npm install @react-native-async-storage/async-storage
npm install react-native-fs --save
```

> Install Tensorflow
```
npm install @tensorflow/tfjs @tensorflow/tfjs-react-native 
```
> Install Tensorflow Model
```
npm install @tensorflow-models/pose-detection
```

> For specific model, the documentation is found in [this link](https://www.npmjs.com/package/@tensorflow-models/pose-detection)

> For `Posenet` model:
> ```
> npm install @tensorflow-models/posenet
> ```
### b) Backend