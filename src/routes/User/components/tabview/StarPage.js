import React, { Component } from "react";
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  FlatList,
  Alert
} from "react-native";
import EmptyPage from "./EmptyPage";
import { fetchGet } from "../../../../fetch/index";
import { STARRED_URL } from "../../../../constants/fetch";
import { connect } from "react-redux";
import RepoListItem from "../../../../components/RepoListItem";

class StarPage extends Component {
  constructor(props) {
    super(props);
    const data = [];
    this.state = { data: data, refreshing: false, page: 1 };
  }

  componentDidMount() {
    this.getStarredList(true);
  }

  handleRefresh() {
    this.getStarredList(true);
  }

  getStarredList(isRefresh) {
    AsyncStorage.getItem(LOGIN_DATA)
      .then(value => {
        if (value) {
          // console.log(JSON.parse(value));
          this.setState({
            avatarUrl: JSON.parse(value).avatar_url,
            name: JSON.parse(value).login,
            joinDate: JSON.parse(value).created_at
          });
        }
      })
      .catch(error => {
        console.log(error);
      });
    this.setState({ refreshing: true });
    fetchGet(
      STARRED_URL,
      this.props.userName,
      this.props.password,
      { page: this.state.page },
      data => {
        if (isRefresh) {
          this.setState({ data: data, refreshing: false });
        } else {
          this.setState({
            data: [...data, ...this.props.data],
            refreshing: false
          });
        }
      },
      error => {
        this.setState({ refreshing: false });
        console.log(error);

        // Alert.alert(error);
      }
    );
  }

  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={({ item }) => <RepoListItem title={item.name} />}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
          ListEmptyComponent={<EmptyPage />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({});

const mapStateToProps = state => ({
  userName: state.userName,
  password: state.password
});

export default connect(mapStateToProps)(StarPage);
