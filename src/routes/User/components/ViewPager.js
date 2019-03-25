import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  ViewPagerAndroid,
  Dimensions,
  NativeModules,
  Alert,
  DeviceEventEmitter
} from "react-native";
import { scaleSize, screenH } from "../../../utils/ScreenUtil";
import { retrieveData } from "../../../utils/AsyncStorageUtils";
import { LOGIN_DATA } from "../../../constants/asyncStorageKey";
import AsyncStorage from "@react-native-community/async-storage";
const { StatusBarManager } = NativeModules;

export default class ViewPager extends Component {
  constructor(props) {
    super(props);
    this.state = { checkIndex: 1 };
  }

  componentWillMount() {
    DeviceEventEmitter.addListener("keyboardWillShow", e => {
      Alert.alert("hahaha");
    });
  }

  onPageSelected = event => {
    console.log(event.nativeEvent);
    this.setState({
      checkIndex: event.nativeEvent.position
    });
  };

  render() {
    return (
      <ViewPagerAndroid
        style={styles.viewPager}
        initialPage={this.state.checkIndex}
      >
        <View style={styles.pageStyle} key="1">
          <Text>First page</Text>
        </View>
        <View style={styles.pageStyle} key="2">
          <FlatList
            data={[
              { key: "Devin" },
              { key: "Jackson" },
              { key: "James" },
              { key: "Joel" },
              { key: "John" },
              { key: "Jillian" },
              { key: "Jimmy" },
              { key: "Julie" }
            ]}
            renderItem={({ item }) => (
              <Text style={styles.item}>{item.key}</Text>
            )}
          />
        </View>
      </ViewPagerAndroid>
    );
  }
}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height:
      Dimensions.get("window").height - scaleSize(180) - StatusBarManager.HEIGHT
  },
  pageStyle: {
    flex: 1
  },
  item: {
    height: scaleSize(50)
  }
});
