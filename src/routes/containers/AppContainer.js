import React from "react";
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import Login from "../Login";
import Main from "../Main";
import StartPage from "../StartPage";
import Icon from "react-native-vector-icons/AntDesign";
import { scaleSize } from "~/utils/ScreenUtils";
import RepoDetail from "~/components/RepoDetail";
import Trends from "../Trends";
import RepoListPage from "../../components/RepoListPage/components/RepoListPage";
import FollowerListPage from "../../components/FollowerListPage/components/FollowerListPage";

const UserStack = createStackNavigator(
  {
    Main: Main
  },
  {
    initialRouteName: "Main"
  }
);

const MainStack = createBottomTabNavigator(
  {
    Trends: {
      screen: Trends,
      navigationOptions: {
        tabBarLabel: "动态"
      }
    },
    UserStack: {
      screen: UserStack,
      navigationOptions: {
        tabBarLabel: "我的"
      }
    }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Icon;
        let iconName;
        if (routeName === "UserStack") {
          iconName = "user";
        } else if (routeName === "Trends") {
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

const LoginSwitch = createSwitchNavigator(
  {
    Start: StartPage,
    Login: Login,
    MainStack: MainStack
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

const StartStatck = createStackNavigator(
  {
    LoginSwitch: LoginSwitch,
    RepoListPage: RepoListPage,
    FollowerListPage: FollowerListPage,
    RepoDetail: RepoDetail
  },
  {
    navigationOptions: {
      header: null
    }
  }
);

export default createAppContainer(StartStatck);
