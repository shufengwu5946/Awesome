import React from 'react';
import {
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from "react-navigation";
import Login from "../components/Login";
import Main from "../components/Main";
import StartPage from "../components/StartPage";
// import Icon from 'react-native-vector-icons/AntDesign';

const MainStack = createBottomTabNavigator(
  { Main: Main },
  // {
  //   defaultNavigationOptions: ({ navigation }) => ({
  //     tabBarIcon: ({ focused, horizontal, tintColor }) => {
  //       const { routeName } = navigation.state;
  //       let IconComponent = Icon;
  //       let iconName;
  //       if (routeName === "Main") {
  //         iconName = `search`;
  //       }
  //       return <IconComponent name={iconName} size={25} color={tintColor} />;
  //     }
  //   }),
  //   tabBarOptions: {
  //     activeTintColor: "dark",
  //     inactiveTintColor: "gray"
  //   }
  // }
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
