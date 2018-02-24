#!/usr/bin/env node
const fs = require("fs");
const Path = require("path");
const rmrf = require("rimraf");
const xcode = require("xcode");
const glob = require("glob");

const iosPath = Path.join(
  process.cwd(),
  "node_modules",
  "react-native-camera",
  "ios"
);
const projglob = Path.join(iosPath, "*", "project.pbxproj");
console.log(projglob);
const gs = glob.sync(projglob);
if (!gs || !gs.length) {
  console.log("No react-native-camera module found");
  process.exit();
}
const projpath = gs[0];
console.log("project path ", projpath);
const facePath = Path.join(iosPath, "FaceDetector");
if (fs.existsSync(facePath)) {
  var project = xcode.project(projpath);
  project.parseSync();
  project.removePbxGroup("FaceDetector");
  console.log("Face Detection removed");
  const list = fs.readdirSync(facePath);
  list.forEach(fileName => {
    //console.log("Checking fileName", fileName);
    project.removeSourceFile(fileName);
  });
  rmrf.sync(facePath);
  const out = project.writeSync();
  fs.writeFileSync(projpath, out);
  console.log("Face Detectionfiles removed");
} else {
  console.log("Face Detection not found in react-native-camera");
}
