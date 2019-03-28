import { ToastAndroid } from "react-native";
import { scaleSize } from "./ScreenUtil";

const toast = (str) => {
  ToastAndroid.showWithGravityAndOffset(
    str,
    ToastAndroid.LONG,
    ToastAndroid.BOTTOM,
    0,
    scaleSize(150)
  );
};

export default toast;
