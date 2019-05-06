import React, { Component } from "react";
import { View, TouchableNativeFeedback, Text, Clipboard } from "react-native";
import styles from "./RepoDetailStyles";
import Info from "./TabView/components/Info";
import TabView from "./TabView/components/TabView";
import Icon from "react-native-vector-icons/AntDesign";
import { scaleSize } from "~/utils/ScreenUtils";
import ModalMenu from "../../ModalMenu";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import ShareAndroid from '~/components/ShareAndroid';
import BrowserOpenAndroid from '~/components/BrowserOpenAndroid';
import toast from "~/utils/ToastUtils";

export default class RepoDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title:
        navigation.getParam("title", "").length > 14
          ? navigation.getParam("title", "").substring(0, 14) + "..."
          : navigation.getParam("title", ""),
      headerRight: (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableNativeFeedback onPress={() => alert("此功能待开发！")}>
            <Icon
              name="star"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={() => alert("此功能待开发！")}>
            <Icon
              name="fork"
              size={scaleSize(40)}
              color="green"
              style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
            />
          </TouchableNativeFeedback>
          <TouchableNativeFeedback onPress={navigation.getParam("showMenu")}>
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

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  constructor(props) {
    super(props);
    this.state = { page: 0, modalMenuVisible: false };
  }

  componentDidMount() {
    this.props.navigation.setParams({ showMenu: this.showMenu });
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
    const htmlUrl = navigation.getParam("htmlUrl","");
    return (
      <View style={styles.container}>
        <View />
        <TabView title={title} author={author} description={description} />
        <Menu ref={this.setMenuRef} style={styles.menu}>
          <MenuItem
            onPress={() => {
              ShareAndroid.share(htmlUrl);
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            分享
          </MenuItem>
          <MenuItem
            onPress={() => {
              BrowserOpenAndroid.open(htmlUrl);
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            在浏览器中打开
          </MenuItem>
          <MenuItem
            onPress={() => {
              Clipboard.setString(htmlUrl);
              toast("复制成功！git");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            复制克隆链接
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            关注
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            创建版本库分支
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            已发布版本
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            下载源码(zip)
          </MenuItem>
          <MenuItem
            onPress={() => {
              alert("此功能待开发！");
              this.hideMenu();
            }}
            style={styles.menuItem}
          >
            添加书签
          </MenuItem>
        </Menu>
      </View>
    );
  }
}
