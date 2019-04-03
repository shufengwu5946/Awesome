import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  WebView,
  TouchableNativeFeedback
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
// import { WebView } from 'react-native-webview';
import { scaleSize } from "../utils/ScreenUtil";
import { fetchGetReadme } from "../fetch";
import { README_URL } from "../constants/fetch";
import { BoxShadow } from "react-native-shadow";

const getHtmlHeight = `
  (function () {
      var height = null;
      function changeHeight() {
        if (document.body.scrollHeight != height) {
          height = document.body.scrollHeight;
          if (window.postMessage) {
            window.postMessage(JSON.stringify({
              type: 'setHeight',
              height: height,
            }))
          }
        }
      }
      setTimeout(changeHeight, 300);
  } ())
  `;

export default class RepoDetail extends Component {
  static navigationOptions = {
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

  constructor(props) {
    super(props);
    this.state = { readme: "", height: 0 };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    fetchGetReadme(
      README_URL(title, author),
      "",
      "",
      {},
      data => {
        this.setState({
          readme: data
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    console.log("this.state.readme " + this.state.readme);

    return (
      <ScrollView>
        <BoxShadow
          setting={{
            width: scaleSize(700),
            height: this.state.height,
            color: "#000",
            border: 0,
            radius: 0,
            opacity: 0.2,
            x: 0,
            y: 3,
            style: { marginVertical: 5 }
          }}
        >
          <WebView
            source={{ html: this.state.readme }}
            javaScriptEnabled={true}
            style={{
              height: this.state.height
            }}
            onMessage={event => this.onMessage(event)}
            injectedJavaScript={getHtmlHeight}
          />
        </BoxShadow>
      </ScrollView>
    );
  }

  onMessage(event) {
    try {
      const action = JSON.parse(event.nativeEvent.data);
      if (action.type === "setHeight" && action.height > 0) {
        this.setState({ height: action.height });
      }
    } catch (error) {
      // pass
      console.log(error);
    }
  }

  _injectJavaScript = () => `
        var a = document.getElementsByTagName('a');
        for(var i = 0; i < a.length; i++){
            a[i].onclick = function (event) {
                window.postMessage(this.href);
                event.preventDefault();
            }
        }
    `;

  _onMessage = e => {
    Linking.openURL(e.nativeEvent.data).catch(err =>
      console.error("An error occurred", err)
    );
  };
}

const styles = StyleSheet.create({
  container: {
    borderWidth: scaleSize(1),
    borderColor: "black",
    height: 300,
    width: 300
  },
  headerRight: {
    flexDirection: "row"
  }
});
