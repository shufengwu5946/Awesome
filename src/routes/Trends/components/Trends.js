import React from "react";
import { Text, View, StatusBar, FlatList } from "react-native";
import styles from "./TrendsStyles";
import Icon from "react-native-vector-icons/AntDesign";
import { scaleSize } from "../../../utils/ScreenUtils";
export default class Trends extends React.Component {
  static navigationOptions = {
    title: "动态"
  };

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <TrendsList />
      </View>
    );
  }
}

const TrendsList = props => (
  <FlatList
    data={[
      { name: "搜索", iconName: "menu-fold" },
      { name: "足迹", iconName: "menu-fold" },
      { name: "趋势版本库", iconName: "menu-fold" },
      { name: "版本库集合", iconName: "menu-fold" },
      { name: "精选主题", iconName: "menu-fold" },
      { name: "全球动态", iconName: "menu-fold" }
    ]}
    renderItem={({ item }) => (
      <TrendsListItem iconName={item.iconName}>{item.name}</TrendsListItem>
    )}
    numColumns={3}
  />
);

const TrendsListItem = props => (
  <View style={styles.item}>
    <Icon
      name={props.iconName}
      size={scaleSize(40)}
      color="green"
      style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
    />
    <Text>{props.children}</Text>
  </View>
);
