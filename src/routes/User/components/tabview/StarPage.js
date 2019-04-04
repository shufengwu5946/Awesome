import React, { Component } from "react";
import { View, FlatList } from "react-native";
import { fetchGetWithAuth } from "../../../../fetch/index";
import { STARRED_URL } from "../../../../constants/Fetch";
import RepoListItem from "../../../../components/RepoListItem";
import { PASSWORD, LOGIN_DATA } from "../../../../constants/AsyncStorage";
import AsyncStorage from "@react-native-community/async-storage";
import toast from "../../../../utils/ToastUtils";
import { scaleSize } from "../../../../utils/ScreenUtils";
import { retrieveData } from "../../../../utils/AsyncStorageUtils";

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
    retrieveData([LOGIN_DATA, PASSWORD])
      .then(datas => {
        return fetchGetWithAuth(
          STARRED_URL,
          JSON.parse(datas[0]).login,
          datas[1],
          { page: this.state.page }
        );
      })
      .then(data => {
        if (isRefresh) {
          this.setState({ data: data, refreshing: false });
        } else {
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
      })
      .catch(error => {
        this.setState({ refreshing: false });
        console.log(error);
      });
  }
}

export default StarPage;
