import React, { Component } from "react";
import { View } from "react-native";
import UserBar from "./UserBar/components/UserBar";
import UserTabView from "./UserTabView/components/UserTabView";
import StarPage from "./UserTabView/components/StarPage";
import ReactPage from "./UserTabView/components/ReactPage";
import ActivityPage from "./UserTabView/components/ActivityPage";
import styles from "./UserStyles";

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
        <UserTabView routes={routes} scenes={scenes} />
      </View>
    );
  }
}