import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import User from "../../User/components/User";

export default class Main extends React.Component {
  static navigationOptions = {
    // title: "我的",
    header: null
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <User />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  },
  content: {
    fontSize: scaleSize(34)
  }
});
