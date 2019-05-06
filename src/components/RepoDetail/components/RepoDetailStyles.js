import { StyleSheet } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtils";

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  menu: {
    position: "absolute",
    top: scaleSize(810),
    left: scaleSize(400)
  },
  menuItem: {
    width:scaleSize(300),
    height:scaleSize(100)
  }
});

export default styles;
