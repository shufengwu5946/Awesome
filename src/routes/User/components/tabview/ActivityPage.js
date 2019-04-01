import React, { Component } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { fetchGet } from "../../../../fetch/index";
import { EVENTS_URL } from "../../../../constants/fetch";
import { LOGIN_DATA } from "../../../../constants/asyncStorageKey";
import AsyncStorage from "@react-native-community/async-storage";
import toast from "../../../../utils/ToastUtils";
import { scaleSize } from "../../../../utils/ScreenUtil";
import ActivityListItem from "../../../../components/ActivityListItem";
import utc2beijing from "../../../../utils/TimeUtils";

class ActivityPage extends Component {
  constructor(props) {
    super(props);
    const data = [];
    this.state = { data: data, refreshing: true, page: 1 };
  }

  componentDidMount() {
    this.setState({ page: 1, refreshing: true }, () => {
      this.getActivityList(true);
    });
  }

  handleRefresh() {
    this.setState({ page: 1, refreshing: true }, () => {
      this.getActivityList(true);
    });
  }

  handleEndReached() {
    this.setState({ page: this.state.page + 1, refreshing: true }, () => {
      this.getActivityList(false);
    });
  }

  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={({ item }) => (
            <ActivityListItem
              item = {item}
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

  getActivityList(isRefresh) {
    const promiseLoginData = AsyncStorage.getItem(LOGIN_DATA);
    Promise.all([promiseLoginData])
      .then(([data]) => {
        fetchGet(
          EVENTS_URL(JSON.parse(data).login),
          "",
          "",
          { page: this.state.page },
          data => {
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

export default ActivityPage;
