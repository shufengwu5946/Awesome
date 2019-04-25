import React, { Component } from "react";
import { View, FlatList, Text } from "react-native";
import { STARRED_URL } from "~/constants/Fetch";
import RepoListItem from "~/components/RepoListItem";
import { PASSWORD, LOGIN_DATA } from "~/constants/AsyncStorage";
import toast from "~/utils/ToastUtils";
import { scaleSize } from "~/utils/ScreenUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import withRefreshList from "~/hocs/withRefreshList";
import { fetchGet } from "../../../../../../../fetch";

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
  retrieveData([LOGIN_DATA, PASSWORD]).then(datas => {
    return fetchGet(
      STARRED_URL,
      {
        Authorization: `Basic ${Base64.encode(
          `${JSON.parse(datas[0]).login}:${datas[1]}`
        )}`
      },
      {
        page: aimPage
      }
    );
  });

const StarPage = withRefreshList(listItemFunc, fetchFunc);
export default StarPage;
