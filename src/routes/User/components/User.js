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
import { Tabs } from "@ant-design/react-native";
import UserTabView from "./tabview/UserTabView";
import FlowPage from "./tabview/FlowPage";
import JestPage from "./tabview/JestPage";
import ReactPage from "./tabview/ReactPage";

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
    // Alert.alert("更新");
  }

  render() {
    const routes = [
      { key: "stars", title: "星标" },
      { key: "second", title: "Second" },
      { key: "third", title: "Third" }
    ];

    const scenes = { stars: FlowPage, second: JestPage, third: ReactPage };

    return (
      <View style={styles.container}>
        <UserBar />
        <UserTabView routes={routes} scenes={scenes} />
      </View>
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
