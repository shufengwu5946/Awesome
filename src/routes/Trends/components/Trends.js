import React from "react";
import { Text, View, StatusBar } from "react-native";
import styles from "./TrendsStyles";

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
