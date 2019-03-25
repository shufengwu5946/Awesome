import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions
} from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import UserBar from "./UserBar";
import TabBar from "./TabBar";
import ViewPager from "./ViewPager";

export default class User extends Component {
  render() {
    const tabs = [
      { title: "First Tab" },
      { title: "Second Tab" },
      { title: "Third Tab" }
    ];

    const style = {
      alignItems: "center",
      justifyContent: "center",
      height: 150,
      backgroundColor: "#fff"
    };

    return (
      <ScrollView stickyHeaderIndices={[1]}>
        <UserBar />
        <TabBar items={["hehe", "haha"]} />
        <ViewPager />
      </ScrollView>
    );
  }
}
