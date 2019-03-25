import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  ViewPagerAndroid,
  Alert
} from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import UserBar from "./UserBar";
import TabBar from "./TabBar";
import ViewPager from "./ViewPager";
import { Tabs } from "@ant-design/react-native";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  handleChange(index, e) {
    // Alert.alert("handleChange " + index);
    this.setState({ page: index });
  }

  componentDidUpdate() {
    Alert.alert("更新");
  }

  render() {
    const tabs = [
      { title: "First Tab" },
      { title: "Second Tab" },
      { title: "Third Tab" }
    ];

    return (
      <ScrollView stickyHeaderIndices={[1]}>
        <UserBar />
        <TabBar items={["hehe", "haha"]} />
        <ViewPager />
        {/* <View style={{ flex: 1 }}>
          <Tabs tabs={tabs} onChange={(tab, index) => this.handleChange(index)} page = {this.state.page}>
            <View style={styles.tab} />
            <View style={styles.tab} />
            <View style={styles.tab} />
          </Tabs>
        </View> */}
        {/* <ViewPagerAndroid style={styles.viewPager} initialPage={0}>
          <View style={styles.pageStyle} key="1">
            <Text>First page</Text>
          </View>
          <View style={styles.pageStyle} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.pageStyle} key="3">
            <Text>Third page</Text>
          </View>
        </ViewPagerAndroid> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF"
  },
  tab: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    height: 0
  },
  viewPager: {
    flex: 1,
    height: 200
  },
  pageStyle: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    height: 200
  }
});
