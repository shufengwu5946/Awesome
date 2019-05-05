import React, { Component } from "react";
import { View, TouchableNativeFeedback,Text } from "react-native";
import styles from "./RepoDetailStyles";
import Info from "./TabView/components/Info";
import TabView from "./TabView/components/TabView";
import Icon from "react-native-vector-icons/AntDesign";
import { scaleSize } from "~/utils/ScreenUtils";
import ModalMenu from "../../ModalMenu";

export default class RepoDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:
        navigation.getParam("title", "").length > 14
          ? navigation.getParam("title", "").substring(0, 14) + "..."
          : navigation.getParam("title", ""),
      headerRight: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableNativeFeedback>
            <Icon
              name="star"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <Icon
              name="fork"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback>
            <Icon
              name="menu-fold"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
        </View>
      )
    };
  };

  constructor(props) {
    super(props);
    this.state = { page: 0, modalMenuVisible: false };
  }

  handleChange(index, e) {
    this.setState({ page: index });
  }

  componentDidUpdate() {}

  render() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    const description = navigation.getParam("description", "");
    return (
      <View style={styles.container}>
        <View />
        <TabView title={title} author={author} description={description} />
        {/* <ModalMenu visible={true}>
          <Text>hehe</Text>
        </ModalMenu> */}
      </View>
    );
  }
}
