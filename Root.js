/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import App from "./App";
import { Provider, connect } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducer from "./src/reducers";

const store = createStore(reducer, applyMiddleware(thunk));

const mapStateToProps = () => ({});

const MainApp = connect(mapStateToProps)(App);

export default class Root extends Component {
  render() {
    return (
      
        <Provider store={store}>
          <MainApp />
        </Provider>
      
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
