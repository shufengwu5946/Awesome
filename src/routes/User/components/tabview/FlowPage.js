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
import { fetchGet } from "../../../../fetch/auth";
import { STARRED_URL } from "../../../../constants/fetch";

class FlowPage extends Component {
  constructor(props) {
    super(props);
    const data = [];
    this.state = { data: data, refreshing: false, page: 1 };
  }

  componentDidMount() {
    getStarredList();
  }

  handleRefresh() {
    this.setState({ refreshing: true });
  }

  getStarredList() {
    fetchGet(
      STARRED_URL,
      this.props.userName,
      this.props.password,
      { page: this.state.page },
      data => {
          
      },
      error => {
        Alert.alert(error);
      }
    );
  }

  render() {
    return (
      <View>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={this.state.data}
          renderItem={({ item }) => <Text style={styles.item}>{item.key}</Text>}
          onRefresh={() => this.handleRefresh()}
          refreshing={this.state.refreshing}
          ListEmptyComponent={<EmptyPage />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    height: 200
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44
  }
});

const mapStateToProps = state => ({
  userName: state.userName,
  password: state.password
});

export default connect(mapStateToProps)(FlowPage);
