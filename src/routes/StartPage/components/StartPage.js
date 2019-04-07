import React from "react";
import { View } from "react-native";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import { retrieveData } from "~/utils/AsyncStorageUtils";

export default class StartPage extends React.Component {
  constructor(props) {
    super(props);
    this.getData();
  }

  getData = () => {
    retrieveData([LOGIN_DATA])
      .then(datas => {
        if (datas[0]) {
          this.props.navigation.navigate("Main");
        } else {
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
