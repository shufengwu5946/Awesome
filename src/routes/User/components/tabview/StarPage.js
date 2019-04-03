import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert,
  ToastAndroid
} from "react-native";
import { fetchGet } from "../../../../fetch/index";
import { STARRED_URL } from "../../../../constants/fetch";
import RepoListItem from "../../../../components/RepoListItem";
import { PASSWORD, LOGIN_DATA } from "../../../../constants/asyncStorageKey";
import AsyncStorage from "@react-native-community/async-storage";
import toast from "../../../../utils/ToastUtils";
import { scaleSize } from "../../../../utils/ScreenUtil";

class StarPage extends Component {
  constructor(props) {
    super(props);
    const data = [];
    this.state = { data: data, refreshing: true, page: 1 };
  }

  componentDidMount() {
    this.setState({ page: 1, refreshing: true }, () => {
      this.getStarredList(true);
    });
  }

  handleRefresh() {
    this.setState({ page: 1, refreshing: true }, () => {
      this.getStarredList(true);
    });
  }

  handleEndReached() {
    this.setState({ page: this.state.page + 1, refreshing: true }, () => {
      this.getStarredList(false);
    });
  }

  // onItemPress() {
  //   this.context.navigate("RepoDetail");
  // }

  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={({ item }) => (
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
          )}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
          keyExtractor={(item, index) => index.toString()}
          onEndReached={() => this.handleEndReached()}
          onEndReachedThreshold={scaleSize(1)}
        />
      </View>
    );
  }

  getStarredList(isRefresh) {
    const promiseLoginData = AsyncStorage.getItem(LOGIN_DATA);
    const promisePassword = AsyncStorage.getItem(PASSWORD);
    Promise.all([promiseLoginData, promisePassword])
      .then(([data, password]) => {
        fetchGet(
          STARRED_URL,
          JSON.parse(data).login,
          password,
          { page: this.state.page },
          data => {
            if (isRefresh) {
              this.setState({ data: data, refreshing: false });
            } else {
              console.log(data);

              console.log([...this.state.data, ...data]);

              this.setState(
                {
                  data: [...this.state.data, ...data],
                  refreshing: false
                },
                () => {
                  if (data.length === 0) {
                    toast("没有更多数据了！");
                    this.setState({ page: this.state.page - 1 });
                  }
                }
              );
            }
          },
          error => {
            this.setState({ refreshing: false });
            console.log(error);
          }
        );
      })
      .catch(error => {
        this.setState({ refreshing: false });
        console.log(error);
      });
  }
}

export default StarPage;
