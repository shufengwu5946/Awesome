import React, { Component } from "react";
import { View, Text } from "react-native";
import FileExplorer from "../../../../../../FileExplorer";

export default class File extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <View>
        <FileExplorer />
      </View>
    );
  }
}
