import React, { Component, PureComponent } from "react";
import { View, ScrollView, Text, TouchableNativeFeedback } from "react-native";
import styles from "./FileExplorerStyles";
import Icon from "react-native-vector-icons/AntDesign";
import { CONTENTS_URL } from "../../../constants/Fetch";
import withRefreshList from "~/hocs/withRefreshList";
import withRefreshListWithoutLoadMore from "../../../hocs/withRefreshListWithoutLoadMore";
import { fetchGet } from "~/fetch";
import { scaleSize } from "../../../utils/ScreenUtils";

const PressContext = React.createContext({
  path: "",
  handlePress: () => {}
});

const FileListItem = props => (
  <TouchableNativeFeedback>
    <View style={styles.fileListItem}>
      <Icon
        style={styles.fileListItemIcon}
        name={props.fileType === "file" ? "filetext1" : "folder1"}
        size={scaleSize(44)}
        color={"green"}
      />
      <Text style={styles.fileListItemText}>{`${props.fileName}`}</Text>
    </View>
  </TouchableNativeFeedback>
);

const listItemFunc = ({ item }) => (
  <FileListItem fileType={item.type} fileName={item.name} />
);

const arrangeData = data => {
  let resFile = [];
  let resFolder = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].type === "file") {
      resFile.push(data[i]);
    } else {
      resFolder.push(data[i]);
    }
  }
  return resFolder.concat(resFile);
};

function FileList(props) {
  const fetchFunc = () =>
    fetchGet(CONTENTS_URL(props.owner, props.repo, props.path), {}, {});
  const FileList = withRefreshListWithoutLoadMore(
    listItemFunc,
    fetchFunc,
    arrangeData
  );
  return <FileList />;
}

class FileExplorer extends PureComponent {
  constructor(props) {
    super(props);
    this.handlePress = path => {
      this.setState(state => ({
        path: state.path + "/" + path
      }));
    };
    this.state = { path: "", handlePress: this.handlePress };
  }

  render() {
    return (
      <PressContext.Provider value={this.state}>
        <View style={styles.explorer}>
          <View style={styles.path}>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            >
              {this.state.path.split("/").map((value, index) => (
                <PathItem pathName={value === "" ? "." : value} key={index} />
              ))}
            </ScrollView>
            <View style={styles.pathUnderLine} />
          </View>
          <View style={styles.fileList}>
            <FileList
              owner={this.props.owner}
              repo={this.props.repo}
              path={this.state.path}
            />
          </View>
        </View>
      </PressContext.Provider>
    );
  }
}

const PathItem = props => (
  <View>
    <Text style={styles.pathItem}>{`   ${props.pathName}   >`}</Text>
  </View>
);

export default FileExplorer;
