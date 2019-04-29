import React, { Component } from "react";
import { View, ScrollView, Text } from "react-native";
import styles from "./FileExplorerStyles";
import Icon from "react-native-vector-icons/AntDesign";
import { CONTENTS_URL } from "../../../constants/Fetch";
import withRefreshList from "~/hocs/withRefreshList"

const FileListItem = props => (
  <View>
    <Icon
      name={props.fileType === "file" ? "file" : "folder"}
      size={scaleSize(24)}
      color={"gray"}
    />
    <Text>{`${props.fileName}`}</Text>
  </View>
);

const listItemFunc = ({ item }) => (
  <FileListItem fileType={item.type} fileName={item.name} />
);

function FileList(props) {
  const fetchFunc = aimPage =>
    fetchGet(
      CONTENTS_URL(props.owner, props.repo, props.path),
      {},
      {
        page: aimPage
      }
    );
  const FileList = withRefreshList(listItemFunc, fetchFunc);
  return <FileList />;
}

class FileExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = { path: "" };
  }

  render() {
    return (
      <View>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {this.state.path.split("/").map((value, index) => (
            <PathItem pathName={value === "" ? "." : value} key={index} />
          ))}
          <FileList owner={this.props.owner} repo={this.props.repo} path={this.props.path} />
        </ScrollView>
      </View>
    );
  }
}

const PathItem = props => (
  <View>
    <Text style={styles.pathItem}>{`   ${props.pathName}   >`}</Text>
  </View>
);

export default FileExplorer;
