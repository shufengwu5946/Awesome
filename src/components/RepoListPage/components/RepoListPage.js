import React, { Component } from "react";
import { View, FlatList, TouchableOpacity, Alert } from "react-native";
import RepoListItem from "~/components/RepoListItem";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import { scaleSize } from "~/utils/ScreenUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { REPOS_URL } from "~/constants/Fetch";
import { fetchGetWithOutAuth } from "~/fetch";
import Icon from "react-native-vector-icons/AntDesign";
import withRefreshList from "~/hocs/withRefreshList";
import styles from "./RepoListPageStyles";
import { HeaderBackButton } from "react-navigation";

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
  constructor(props) {
    super(props);
  }

  render() {
    return <RepoList />;
  }
}

export default RepoListPage;
