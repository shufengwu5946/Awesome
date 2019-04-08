import React, { Component } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";
import CardView from "../../../../../../../components/RNCardView.android";

export default class ReactPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <CardView
          style={{
            marginTop: 30,
            marginLeft: 30,
            marginRight: 30,
            paddingRight: 20,
            paddingLeft: 20,
            paddingTop: 20,
            paddingBottom: 20,
          }}
        >
          <Text>ReactPage</Text>
        </CardView>
      </View>
    );
  }
}
