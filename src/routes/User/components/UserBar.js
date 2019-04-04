import React, { Component } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtils";
import { LOGIN_DATA } from "../../../constants/AsyncStorage";
import utc2beijing from "../../../utils/TimeUtils";
import { retrieveData } from "../../../utils/AsyncStorageUtils";

export default class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarUrl: "", name: "", joinDate: "" };
  }

  componentDidMount() {
    retrieveData([LOGIN_DATA])
      .then(datas => {
        if (datas[0]) {
          this.setState({
            avatarUrl: JSON.parse(datas[0]).avatar_url,
            name: JSON.parse(datas[0]).login,
            joinDate: JSON.parse(datas[0]).created_at
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.avatar} source={{ uri: this.state.avatarUrl }} />
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{this.state.name}</Text>
          <Text style={styles.userJoinDate}>{`加入时间 ${utc2beijing(
            this.state.joinDate
          )}`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: scaleSize(200),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: scaleSize(20)
  },
  avatar: {
    width: scaleSize(160),
    height: scaleSize(160),
    backgroundColor: "#FFFFFF",
    borderRadius: scaleSize(80)
  },
  userInfo: {
    flex: 1,
    height: scaleSize(160),
    paddingLeft: scaleSize(20),
    paddingRight: scaleSize(20),
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  userName: {
    fontSize: scaleSize(40),
    color: "#333333"
  },
  userJoinDate: {
    fontSize: scaleSize(26),
    color: "#333333"
  }
});
