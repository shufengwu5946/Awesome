import React, { Component } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import { scaleSize } from "../utils/ScreenUtil";
import Icon from "react-native-vector-icons/AntDesign";

export default class RepoListItem extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: this.props.imageUrl }}
          style={styles.imageUrl}
          defaultSource={require("../assets/img/defaultImg.png")}
        />
        <View>
          <View style={styles.contentTitle}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text style={styles.language}>{this.props.language}</Text>
          </View>
          <Text style={styles.description}>{this.props.description}</Text>
          <View style={styles.contentAuthor}>
            <View style={styles.starForkNumberContainer}>
              <Icon name="star" size={scaleSize(24)} color={"gray"} />
              <Text style={styles.starNumber}>{this.props.starNumber}</Text>
            </View>
            <View style={styles.starForkNumberContainer}>
              <Icon name="fork" size={scaleSize(24)} color={"gray"} />
              <Text style={styles.forkNumber}>{this.props.forkNumber}</Text>
            </View>

            <View style={styles.authorContainer}>
              <Icon name="user" size={scaleSize(24)} color={"gray"} />
              <Text style={styles.author}>{this.props.author}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: scaleSize(10),
    marginRight: scaleSize(10),
    marginBottom: scaleSize(10),
    marginTop: scaleSize(10),
    flexDirection: "row",
    borderWidth: scaleSize(1)
  },
  imageUrl: {
    height: scaleSize(100),
    width: scaleSize(100),
    marginLeft: scaleSize(10),
    marginTop: scaleSize(10)
  },
  contentTitle: {
    flexDirection: "row"
  },
  title: {
    width: scaleSize(410),
    fontSize: scaleSize(32),
    color: "green",
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    flexWrap: "wrap"
  },
  language: {
    width: scaleSize(180),
    color: "gray",
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(10),
    paddingTop: scaleSize(10),
    paddingRight: scaleSize(10),
    flexWrap: "wrap"
  },
  description: {
    width: scaleSize(590),
    color: "black",
    fontSize: scaleSize(24),
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingRight: scaleSize(20),
    flexWrap: "wrap"
  },
  contentAuthor: {
    flexDirection: "row"
  },
  starForkNumberContainer: {
    flexDirection: "row",
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingBottom: scaleSize(10),
    width: scaleSize(150)
  },
  starNumber: {
    paddingLeft: scaleSize(5),
    width: scaleSize(106),
    fontSize: scaleSize(24),
    color: "gray"
  },
  forkNumber: {
    paddingLeft: scaleSize(5),
    width: scaleSize(106),
    fontSize: scaleSize(24),
    color: "gray"
  },
  authorContainer: {
    width: scaleSize(290),
    flexDirection: "row",
    paddingLeft: scaleSize(20),
    paddingTop: scaleSize(10),
    paddingRight: scaleSize(20),
    paddingBottom: scaleSize(10)
  },
  author: {
    fontSize: scaleSize(24),
    color: "gray",
    paddingLeft: scaleSize(5),
    flexWrap: "wrap",
    width: scaleSize(226)
  }
});
