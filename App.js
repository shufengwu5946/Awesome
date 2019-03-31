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
import ExtraDimensions from "react-native-extra-dimensions-android";
import { screenHeight } from "./src/reducers/auth";
import NavigationService from "./src/routes/Auth/containers/NavigationService";

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AppContainer
        onNavigationStateChange={(prevNav, nav, action) => {
          {
            /* console.log("prevNav=", prevNav);
          console.log("nav=", nav);
          console.log("action=", action); */
          }
          if (action.routeName === "User") {
            DeviceEventEmitter.addListener("WillShow", isAllScreen => {
              let h = isAllScreen
                ? ExtraDimensions.get('REAL_WINDOW_HEIGHT')
                : ExtraDimensions.get('REAL_WINDOW_HEIGHT') -
                  ExtraDimensions.get('SOFT_MENU_BAR_HEIGHT');
              this.props.setScreenHeight(h);
            });
          } else {
            DeviceEventEmitter.removeAllListeners("WillShow");
          }
          routes = nav.routes;
        }}

        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
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
