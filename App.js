/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View, DeviceEventEmitter, Alert } from "react-native";
import AppContainer from "./src/routes/Auth/index";
import { connect } from "react-redux";
import { setScreenHeight as setScreenH } from "./src/actions/auth";
import { Dimensions } from "react-native";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContainer
        onNavigationStateChange={(prevNav, nav, action) => {
          console.log("prevNav=", prevNav);
          console.log("nav=", nav);
          console.log("action=", action);
          if (action.routeName === "User") {
            DeviceEventEmitter.addListener("WillShow", e => {
              console.log("WillShow");

              const h = Dimensions.get("window").height;
              console.log("WillShow " + h);
              this.props.setScreenHeight(h);
            });
          } else {
            DeviceEventEmitter.removeAllListeners("WillShow");
          }
          routes = nav.routes;
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF"
  }
});

const mapStateToProps = state => ({
  screenHeight: state.screenHeight
});

const mapDispatchToProps = dispatch => ({
  setScreenHeight: screenHeight => {
    dispatch(setScreenH(screenHeight));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
