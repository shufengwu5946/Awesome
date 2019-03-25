import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  ViewPagerAndroid
} from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import { retrieveData } from "../../../utils/AsyncStorageUtils";
import { LOGIN_DATA } from "../../../constants/asyncStorageKey";
import AsyncStorage from "@react-native-community/async-storage";

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = { checkIndex: 1 };
  }

  onPageSelected = event => {
    console.log(event.nativeEvent);
    this.setState({
        checkIndex: event.nativeEvent.position
    });
  };

  render() {
    return (
      <ViewPagerAndroid style={styles.viewPager} initialPage={this.state.checkIndex}>
        <View style={styles.pageStyle} key="1">
          <Text>First page</Text>
        </View>
        <View style={styles.pageStyle} key="2">
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
          ]}
          renderItem={({item}) => <Text style={styles.item}>{item.key}</Text>}
        />
        </View>
      </ViewPagerAndroid>
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height:300
  },
  pageStyle: {
    flex: 1,
    height:300
  }
});
