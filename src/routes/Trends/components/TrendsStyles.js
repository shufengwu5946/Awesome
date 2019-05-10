import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    fontSize: scaleSize(34)
  },
  item: {
    width: scaleSize(240)
  }
});

export default styles;
