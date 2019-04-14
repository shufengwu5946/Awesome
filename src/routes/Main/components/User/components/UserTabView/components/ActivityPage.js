import React, { Component } from "react";
import { View, FlatList } from "react-native";
import ActivityListItem from "~/components/ActivityListItem";
import toast from "~/utils/ToastUtils";
import { retrieveData } from "~/utils/AsyncStorageUtils";
import { fetchGetWithOutAuth } from "~/fetch";
import { LOGIN_DATA } from "~/constants/AsyncStorage";
import { EVENTS_URL } from "~/constants/Fetch";
import { scaleSize } from "~/utils/ScreenUtils";
import withRefreshList from "~/hocs/withRefreshList";

const listItemFunc = ({ item }) => <ActivityListItem item={item} />;

const fetchFunc = aimPage =>
  retrieveData([LOGIN_DATA]).then(datas => {
    return fetchGetWithOutAuth(EVENTS_URL(JSON.parse(datas[0]).login), {
      page: aimPage
    });
  });

const ActivityPage = withRefreshList(listItemFunc, fetchFunc);
export default ActivityPage;
