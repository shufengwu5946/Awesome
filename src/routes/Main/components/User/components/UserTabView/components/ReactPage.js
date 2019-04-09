import React, { Component } from "react";
import { ScrollView, Image, Text, View, StyleSheet } from "react-native";
import CardView from "~/components/RNCardView.android";
import { scaleSize } from "~/utils/ScreenUtils";

export default class ReactPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <CardView
          style={{
            marginTop: scaleSize(20),
            marginLeft: scaleSize(20),
            marginRight: scaleSize(20)
          }}
          paddingTop={scaleSize(20)}
          paddingBottom={scaleSize(20)}
          paddingLeft={scaleSize(20)}
          paddingRight={scaleSize(20)}
          radius={scaleSize(20)}
          minimumWidth={scaleSize(200)}
          minimumHeight={scaleSize(200)}
        >
          <Text>ReactPage</Text>
        </CardView>
      </View>
    );
  }
}
