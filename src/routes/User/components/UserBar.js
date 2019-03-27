import React, { Component } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import { LOGIN_DATA } from "../../../constants/asyncStorageKey";
import AsyncStorage from "@react-native-community/async-storage";

export default class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarUrl: "", name: "", joinDate: "" };
  }

  componentDidMount() {
    AsyncStorage.getItem(LOGIN_DATA)
      .then(value => {
        if (value) {
          // console.log(JSON.parse(value));
          this.setState({
            avatarUrl: JSON.parse(value).avatar_url,
            name: JSON.parse(value).login,
            joinDate: JSON.parse(value).created_at
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
          <Text style={styles.userJoinDate}>{`加入时间 ${
            this.state.joinDate
          }`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#DDDDDD",
    height: scaleSize(200),
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: scaleSize(20)
  },
  avatar: {
    width: scaleSize(160),
    height: scaleSize(160),
    backgroundColor: "#FFFFFF"
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
