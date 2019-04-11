import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableNativeFeedback,
  Alert
} from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import styles from "./InfoPageStyles";
import CardView from "~/components/RNCardView.android";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import NavigationService from "~/routes/containers/NavigationService";
import RepoListPage from "../../../../../../../../../components/RepoListPage/components/RepoListPage";

export default class InfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      followers: 0,
      following: 0,
      public_repos: 0,
      public_gists: 0
    };
  }

  componentDidMount() {
    retrieveData([LOGIN_DATA])
      .then(datas => {
        if (datas[0]) {
          this.setState({
            name: JSON.parse(datas[0]).name,
            followers: JSON.parse(datas[0]).followers,
            following: JSON.parse(datas[0]).following,
            public_repos: JSON.parse(datas[0]).public_repos,
            public_gists: JSON.parse(datas[0]).public_gists
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  _onPress(itemText) {
    switch (itemText) {
      case "跟随者":
        Alert.alert("跟随者");
        break;
      case "跟随":
        Alert.alert("跟随");
        break;
      case "版本库":
        NavigationService.navigate("RepoListPage");
        break;
      case "主题帖":
        Alert.alert("主题帖");
        break;
      default:
        break;
    }
  }

  render() {
    return (
      <View>
        <CardView
          style={{
            marginTop: scaleSize(10),
            marginLeft: scaleSize(10),
            marginRight: scaleSize(10),
            marginBottom: scaleSize(10)
          }}
          cardElevation={scaleSize(5)}
        >
          <View style={styles.container}>
            <Text style={styles.name}>{this.state.name}</Text>
            <View style={styles.list}>
              <ListItem
                itemCount={this.state.followers}
                itemText={"跟随者"}
                _onPress={this._onPress.bind(this, "跟随者")}
              />
              <ListItem
                itemCount={this.state.following}
                itemText={"跟随"}
                _onPress={this._onPress.bind(this, "跟随")}
              />
              <ListItem
                itemCount={this.state.public_repos}
                itemText={"版本库"}
                _onPress={this._onPress.bind(this, "版本库")}
              />
              <ListItem
                itemCount={this.state.public_gists}
                itemText={"主题帖"}
                _onPress={this._onPress.bind(this, "主题帖")}
              />
            </View>
          </View>
        </CardView>
      </View>
    );
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.props._onPress}>
        <View style={styles.listItem}>
          <Text style={styles.listItemCount}>{this.props.itemCount}</Text>
          <Text style={styles.listItemText}>{this.props.itemText}</Text>
        </View>
      </TouchableNativeFeedback>
    );
  }
}
