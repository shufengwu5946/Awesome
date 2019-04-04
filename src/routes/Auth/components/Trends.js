import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtils";

export default class Trends extends React.Component {
  // static navigationOptions = {
  //   title: "动态"
  // };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Text style={styles.content}>动态</Text>
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
