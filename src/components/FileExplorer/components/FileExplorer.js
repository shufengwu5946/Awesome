import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./FileExplorerStyles";

class FileExplorer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <PathItem pathName="." />
          <PathItem pathName="android" />
          <PathItem pathName="src" />
          <PathItem pathName="main" />
          <PathItem pathName="java" />
          <PathItem pathName="com" />
          <PathItem pathName="hehe" />
        </ScrollView>
      </View>
    );
  }
}

const PathItem = props => (
  <View>
    <Text style={styles.pathItem}>{`   ${props.pathName}   >`}</Text>
  </View>
);

export default FileExplorer;
