import React, { Component } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";

export default class EmptyPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>暂无数据,点击刷新</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
