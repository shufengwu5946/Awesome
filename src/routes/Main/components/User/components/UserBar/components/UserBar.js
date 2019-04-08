import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import utc2beijing from "~/utils/TimeUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import styles from "./UserBarStyles";
import FastImage from "react-native-fast-image";

export default class UserBar extends Component {
  constructor(props) {
    super(props);
    this.state = { avatarUrl: "", name: "", joinDate: "" };
  }

  componentDidMount() {
    retrieveData([LOGIN_DATA])
      .then(datas => {
        console.log(JSON.parse(datas[0]).created_at);
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
        <FastImage style={styles.avatar} source={{ uri: this.state.avatarUrl }} />
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

