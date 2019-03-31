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
import ReactPage from "./tabview/ReactPage";
import ActivityPage from "./tabview/ActivityPage";
import ActivityListItem from "../../../components/ActivityListItem";

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
      { key: "stars", title: "星标" },
      { key: "activity", title: "活动" },
      { key: "third", title: "Third" }
    ];

    const scenes = {
      stars: StarPage,
      activity: ActivityPage,
      third: ReactPage
    };

    return (
      <View style={styles.container}>
        <UserBar />
        {/* <ActivityListItem
          imageUrl={
            "https://avatars3.githubusercontent.com/u/44724122?s=40&v=4"
          }
          userName={"shufengwu5946"}
          time={"2019-01-01 00:00:00"}
          event={{
            type: "WatchEvent",
            repo: {
              name:
                "NNNNNNNNNhttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttpshttps"
            }
          }}
        /> */}
        <UserTabView routes={routes} scenes={scenes} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
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
