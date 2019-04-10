import React, { Component } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import styles from "./InfoPageStyles";
import CardView from "~/components/RNCardView.android";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { LOGIN_DATA } from "~/constants/AsyncStorage";

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
          <View style={styles.container>
            <Text>{this.state.name}</Text>
            <View>
                <View>
                    <Text>1</Text>
                    <Text>跟随者</Text>
                </View>
                <View>
                <Text><1/Text>
                    <Text>跟随</Text>
                </View>
                <View>
                <Text>1</Text>
                    <Text>版本库</Text>
                </View>
                <View>
                <Text>1</Text>
                    <Text>主题帖</Text>
                </View>
            </View>
          </View>
        </CardView>
      </View>
    );
  }
}
