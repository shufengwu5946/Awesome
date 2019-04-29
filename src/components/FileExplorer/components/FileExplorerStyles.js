import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";

const styles = StyleSheet.create({
  pathItem: {
    fontSize: scaleSize(32),
    color: "black",
    height: scaleSize(100),
    lineHeight: scaleSize(100),
    backgroundColor: "yellow"
  },
  fileListItem:{
    flexDirection: 'row'
  }
});

export default styles;
