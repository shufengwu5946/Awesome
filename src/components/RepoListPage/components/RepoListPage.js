// import React, { Component } from "react";
// import {
//   StyleSheet,
//   View,
//   Text,
//   Image,
//   ScrollView,
//   Linking,
//   WebView,
//   TouchableNativeFeedback,
//   Dimensions
// } from "react-native";
// import Icon from "react-native-vector-icons/AntDesign";
// import { scaleSize } from "~/utils/ScreenUtils";
// import { fetchGetReadme } from "~/fetch";
// import { README_URL } from "~/constants/Fetch";
// import { TabView, SceneMap, TabBar } from "react-native-tab-view";

// export default class RepoListPage extends Component {
//   static navigationOptions = ({ navigation }) => {
//     return {
//       title: "版本库",
//       headerRight: (
//         <View style={{ flexDirection: "row", alignItems: "center" }}>
//           <TouchableNativeFeedback>
//             <Icon
//               name="menu-fold"
//               size={scaleSize(40)}
//               color="green"
//               style={{ marginLeft: scaleSize(25), marginRight: scaleSize(25) }}
//             />
//           </TouchableNativeFeedback>
//         </View>
//       )
//     };
//   };

//   constructor(props) {
//     super(props);
//     const routes = [{ key: "info", title: "信息" }];
//     const { navigation } = this.props;
//     const title = navigation.getParam("title", "");
//     const author = navigation.getParam("author", "");
//     const description = navigation.getParam("description", "");
//     this.state = {
//       readme: "",
//       title: title,
//       author: author,
//       description: description,
//       index: 0,
//       routes: routes
//     };
//   }

//   componentDidMount() {
//     fetchGetReadme(README_URL(this.state.title, this.state.author), {})
//       .then(data => {
//         this.setState({
//           readme: data,
//           title: this.state.title
//         });
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }
//   render() {
//     return (
//       <ScrollView style={styles.container} nestedScrollEnabled={true}>
//         <View style={styles.border}>
//           <Text style={styles.title} ellipsizeMode="tail" numberOfLines={1}>
//             {this.state.title}
//           </Text>
//           <Text style={styles.description}>{this.state.description}</Text>
//         </View>

//         <RepoInfo readme={this.state.readme} />
//       </ScrollView>
//     );
//   }
// }

import React, { Component } from "react";
import { View, FlatList, TouchableNativeFeedback } from "react-native";
import RepoListItem from "~/components/RepoListItem";
import { PASSWORD, LOGIN_DATA } from "~/constants/AsyncStorage";
import toast from "~/utils/ToastUtils";
import { scaleSize } from "~/utils/ScreenUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { REPOS_URL } from "~/constants/Fetch";
import { fetchGetWithOutAuth } from "~/fetch";
import Icon from "react-native-vector-icons/AntDesign";

import withRefreshList from "~/hocs/withRefreshList";

const listItemFunc = ({ item }) => (
  <RepoListItem
    title={item.name}
    imageUrl={item.owner.avatar_url}
    language={item.language}
    description={item.description}
    author={item.owner.login}
    starNumber={item.stargazers_count}
    forkNumber={item.forks_count}
    size={item.size}
  />
);

const fetchFunc = aimPage =>
  retrieveData([LOGIN_DATA]).then(datas => {
    return fetchGetWithOutAuth(REPOS_URL(JSON.parse(datas[0]).login), {
      page: aimPage
    });
  });

const RepoList = withRefreshList(listItemFunc, fetchFunc);

class RepoListPage extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: "版本库",
      headerRight: (
        <View style={{ alignItems: "center" }}>
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

  render() {
    return (
      <RepoList/>
    );
  }
}

export default RepoListPage;
