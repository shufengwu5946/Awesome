import React, { Component } from "react";
import { ScrollView, Image, Text, View, StyleSheet,Alert,TouchableOpacity } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import { retrieveData } from "../../../utils/AsyncStorageUtils";
import { LOGIN_DATA } from "../../../constants/asyncStorageKey";
import AsyncStorage from "@react-native-community/async-storage";

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = { checkIndex: 0 };
  }

  handleClick(index,e){
      console.log(index);
      
    this.setState({ checkIndex: index })
  }

  render() {
    return (
      <View style={styles.container}>
        {this.props.items.map((value, index) => {
          const checkBgColor =
            index === this.state.checkIndex ? "green" : "white";
          const checkFontColor =
            index === this.state.checkIndex ? "green" : "gray";
          return (
            <TouchableOpacity key={index} style={styles.item} onPress={this.handleClick.bind(this,index)}>
              <View style={styles.itemTextView}>
                <Text style={{ ...styles.itemText, color: checkFontColor }}>
                  {value}
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: checkBgColor,
                  ...styles.itemUnderLine
                }}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "row"
  },
  item: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    flexDirection: "column"
  },
  itemTextView: {
    flex: 1,
    color: "gray",
    fontSize: scaleSize(50),
    justifyContent: "center",
    alignItems: "center",
    height: scaleSize(80)
  },
  itemText: {
    color: "gray",
    fontSize: scaleSize(40)
  },
  itemUnderLine: {
    flex: 1,
    height: scaleSize(5)
  }
});
