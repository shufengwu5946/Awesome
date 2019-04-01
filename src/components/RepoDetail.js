import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  WebView
} from "react-native";
// import { WebView } from 'react-native-webview';
import { scaleSize } from "../utils/ScreenUtil";
// import { fetchGet, fetchGetReadme } from "../fetch";
import { README_URL } from "../constants/fetch";

export default class RepoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { readme: "" };
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
      <View style={styles.container}>
        <WebView
          source={{ html: this.state.readme }}
          javaScriptEnabled={true}
        />
      </View>
    );
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
    flex: 1,
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginBottom: scaleSize(10),
    marginTop: scaleSize(10),
    borderWidth: scaleSize(1),
    borderColor: "black"
  }
});
