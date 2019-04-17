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
import { SectionList, StyleSheet, Text, View } from "react-native";
import { scaleSize } from "~/utils/ScreenUtils";
import DrawerLayout from "react-native-drawer-layout";

class RepoListMenuList extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <SectionList
          sections={[
            { title: "类型", data: ["自己的","公开的","私有的","会员"] },
            {
              title: "排序",
              data: [
                "名称升序",
                "名称降序",
                "最近创建的",
                "以前创建的",
                "最近更新的",
                "以前更新的",
                "最多提交的",
                "最少提交的"
              ]
            }
          ]}
          renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
          renderSectionHeader={({ section }) => (
            <Text style={styles.sectionHeader}>{section.title}</Text>
          )}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

class RepoListMenu extends Component {
  render() {
    return (
      <DrawerLayout
        ref={"drawerLayout"}
        drawerBackgroundColor="white"
        drawerWidth={scaleSize(400)}
        drawerPosition={DrawerLayout.positions.Right}
        renderNavigationView={() => <RepoListMenuList/>}
        onDrawerOpen={() => {}}
        onDrawerClose={() => {}}
        onDrawerSlide={() => {}}
        keyboardDismissMode="on-drag"
      />
    );
  }
}

export default RepoListMenu;
