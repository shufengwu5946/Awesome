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
import UserBar from "./UserBar";
import UserTabView from "./tabview/UserTabView";
import StarPage from "./tabview/StarPage";
import JestPage from "./tabview/JestPage";
import ReactPage from "./tabview/ReactPage";
import RepoListItem from "../../../components/RepoListItem";

export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = { page: 0 };
  }

  handleChange(index, e) {
    this.setState({ page: index });
  }

  componentDidUpdate() {}

  render() {
    const routes = [
      { key: "stars", title: "star" },
      { key: "second", title: "Second" },
      { key: "third", title: "Third" }
    ];

    const scenes = { stars: StarPage, second: JestPage, third: ReactPage };

    return (
      <View style={styles.container}>
        <UserBar />
        {/* <RepoListItem
          imageUrl="https://avatars0.githubusercontent.com/u/16875258?s=460&v=4"
          title="React-Native-Send-Event-from-Native-Module"
          language = "Objective-C"
          description = "JavaScript端接收来自RN原生模块发送的事件，实现了前端与原生模块之间的通信"
          author = "chaohuangtianjie994"
          starNumber = {11}
          forkNumber={44}
        /> */}
        <UserTabView routes={routes} scenes={scenes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height:'100%',
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
