import React, { Component } from "react";
import { View, FlatList } from "react-native";
import ActivityListItem from "~/components/ActivityListItem";
import toast from "~/utils/ToastUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { fetchGetWithOutAuth } from "~/fetch";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import { EVENTS_URL } from "~/constants/Fetch";
import { scaleSize } from "~/utils/ScreenUtils";
// import CardView from "~/components/RNCardView.android";

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
          renderItem={({ item }) => <ActivityListItem item={item} />}
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
    retrieveData([LOGIN_DATA])
      .then(datas => {
        return fetchGetWithOutAuth(EVENTS_URL(JSON.parse(datas[0]).login), {
          page: this.state.page
        });
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

export default ActivityPage;
