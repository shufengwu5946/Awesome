import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { scaleSize } from "../../../../utils/ScreenUtil";

export default class UserTabView extends React.Component {
  state = {
    index: 0,
    routes: this.props.routes
  };

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap(this.props.scenes)}
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get("window").width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: "green" }}
            style={{ backgroundColor: "white" }}
            labelStyle = {{textTransform:"capitalize",fontSize:scaleSize(30)}}
            activeColor="green"
            inactiveColor="gray"
            contentContainerStyle={{ height: scaleSize(100) }}
          />
        )}
        
      />
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  }
});
