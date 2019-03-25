import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";

export default class Main extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Text style={styles.content}>登录成功</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    fontSize: scaleSize(34)
  }
});
