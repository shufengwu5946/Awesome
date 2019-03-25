import React from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { LOGIN_DATA } from "../../../constants/asyncStorageKey";

export default class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.retrieveData();
  }

  retrieveData = () => {
    AsyncStorage.getItem(LOGIN_DATA)
      .then(value => {
        if (value) {
          console.log("Main");
          
          this.props.navigation.navigate("Main");
        } else {
          console.log("Login");
          this.props.navigation.navigate("Login");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <View />;
  }
}
