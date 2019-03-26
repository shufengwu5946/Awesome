import React from "react";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Login from "../components/Login";
import Main from "../components/Main";
import Trends from "../components/Trends";
import StartPage from "../components/StartPage";
import Icon from "react-native-vector-icons/AntDesign";
import { scaleSize } from "../../../utils/ScreenUtil";

const MainStack = createBottomTabNavigator(
  {
    Trends: Trends,
    User: Main,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === "User") {
          iconName = "user";
        }else if(routeName === "Trends"){
          iconName = "home";
        }
        return (
          <IconComponent
            name={iconName}
            size={scaleSize(46)}
            color={focused ? "green" : "gray"}
          />
        );
      }
    }),
    tabBarOptions: {
      style: { height: scaleSize(100), paddingBottom: scaleSize(10) },
      activeTintColor: "green",
      inactiveTintColor: "gray",
      labelStyle: {
        fontSize: scaleSize(22)
      }
    }
  }
);

export default createAppContainer(
  createSwitchNavigator(
    {
      Start: StartPage,
      Login: Login,
      Main: MainStack
    },
    {
      initialRouteName: "Start"
    }
  )
);
