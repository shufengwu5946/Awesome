import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Linking,
  WebView,
  TouchableNativeFeedback,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/AntDesign";
// import { WebView } from 'react-native-webview';
import { scaleSize } from "~/utils/ScreenUtils";
import { fetchGetReadme } from "~/fetch";
import { README_URL } from "~/constants/Fetch";
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
    const routes = [{ key: "info", title: "信息" }];
    const { navigation } = this.props;
    const title = navigation.getParam("title", "");
    const author = navigation.getParam("author", "");
    const description = navigation.getParam("description", "");
    this.state = {
      readme: "",
      title: title,
      author: author,
      description: description,
      index: 0,
      routes: routes
    };
  }

  componentDidMount() {
    fetchGetReadme(README_URL(this.state.title, this.state.author), {})
      .then(data => {
        this.setState({
          readme: data,
          title: this.state.title
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <ScrollView style={styles.container} nestedScrollEnabled={true}>
        <View style={styles.border}>
          <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
            {this.state.title}
          </Text>
          <Text style={styles.description}>{this.state.description}</Text>
        </View>
        {/* <TabView
          navigationState={this.state}
          renderScene={({ route, jumpTo }) => {
            switch (route.key) {
              case "info":
                return <RepoInfo readme={this.state.readme} />;
            }
          }}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ width: Dimensions.get("window").width }}
          renderTabBar={props => (
            <TabBar
              lazy
              {...props}
              indicatorStyle={{ backgroundColor: "green" }}
              style={{ backgroundColor: "white" }}
              labelStyle={{
                textTransform: "capitalize",
                fontSize: scaleSize(30)
              }}
              activeColor="green"
              inactiveColor="gray"
              contentContainerStyle={{ height: scaleSize(100) }}
            />
          )}
        /> */}
        <RepoInfo readme={this.state.readme} />
      </ScrollView>
    );
  }

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

class RepoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 0
    };
  }

  getHtmlHeight = `
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

  onMessage = event => {
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

  render() {
    return (
      <ScrollView nestedScrollEnabled={true}>
        <View style={{ height: this.state.height, ...styles.border }}>
          <WebView
            source={{ html: this.props.readme }}
            javaScriptEnabled={true}
            style={{
              height: this.state.height
            }}
            onMessage={event => this.onMessage(event)}
            injectedJavaScript={this.getHtmlHeight}
          />
        </View>
      </ScrollView>
    );
  }
}

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
