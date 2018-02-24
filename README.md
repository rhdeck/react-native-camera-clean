# react-native-camera-clean

Allows zero-configdeployment of react-native-camera

# Usage

```
yarn add react-native-camera react-native-camera-clean
react-native link
```

That's it.

# Impact

Forces react-native-camera to use the "stub" for face detection. This takes away cool functionality, but allows automatic deployment of the camera without requiring a number of manual steps inside Xcode. Because who like that?
