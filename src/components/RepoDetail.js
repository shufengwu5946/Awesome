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
// import { BoxShadow } from "react-native-shadow";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";



export default class RepoDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam("title", "").substring(0, 14) + "...",
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
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    const description = navigation.getParam("description", "");
    this.state = {
      readme: "",
      height: 0,
      title: title,
      author: author,
      description: description
    };
  }

  componentDidMount() {
    fetchGetReadme(
      README_URL(this.state.title, this.state.author),
      "",
      "",
      {},
      data => {
        this.setState({
          readme: data,
          title: this.state.title
        });
      },
      error => {
        console.log(error);
      }
    );
  }
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.border}>
            <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
              {this.state.title}
            </Text>
            <Text style={styles.description}>{this.state.description}</Text>
          </View>
          <RepoInfo readme = {this.state.readme} height = {this.state.height}/>
        </View>
      </ScrollView>
    );
  }

  // onMessage(event) {
  //   try {
  //     const action = JSON.parse(event.nativeEvent.data);
  //     if (action.type === "setHeight" && action.height > 0) {
  //       this.setState({ height: action.height });
  //     }
  //   } catch (error) {
  //     // pass
  //     console.log(error);
  //   }
  // }

  // _injectJavaScript = () => `
  //       var a = document.getElementsByTagName('a');
  //       for(var i = 0; i < a.length; i++){
  //           a[i].onclick = function (event) {
  //               window.postMessage(this.href);
  //               event.preventDefault();
  //           }
  //       }
  //   `;

  // _onMessage = e => {
  //   Linking.openURL(e.nativeEvent.data).catch(err =>
  //     console.error("An error occurred", err)
  //   );
  // };
}

const RepoInfo = props => {

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

  const onMessage = (event) => {
    try {
      const action = JSON.parse(event.nativeEvent.data);
      if (action.type === "setHeight" && action.height > 0) {
        this.setState({ height: action.height });
      }
    } catch (error) {
      // pass
      console.log(error);
    }
  };

  return (
    <View style={styles.border}>
      <WebView
        source={{ html: props.readme }}
        javaScriptEnabled={true}
        style={{
          height: props.height
        }}
        onMessage={event => onMessage(event)}
        injectedJavaScript={getHtmlHeight}
      />
    </View>
  );

  
};

const styles = StyleSheet.create({
  title: {
    marginLeft: scaleSize(30),
    marginRight: scaleSize(30),
    marginTop: scaleSize(20),
    color: "black",
    fontSize: scaleSize(43)
  },
  container: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(10)
  },
  headerRight: {
    flexDirection: "row"
  },
  border: {
    borderWidth: scaleSize(1),
    borderColor: "black",
    marginTop: scaleSize(10),
    marginBottom: scaleSize(10)
  },
  description: {
    marginLeft: scaleSize(30),
    marginRight: scaleSize(30),
    marginTop: scaleSize(10),
    marginBottom: scaleSize(20),
    color: "black",
    fontSize: scaleSize(30)
  }
});
