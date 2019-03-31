import React from "react";
import { StyleSheet, Text, View, StatusBar } from "react-native";
import { scaleSize } from "../../../utils/ScreenUtil";
import { Button, InputItem } from "@ant-design/react-native";
import {
  setUserName as setUser,
  setPassword as setPass,
  login
} from "../../../actions/auth";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/AntDesign";

class Login extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.loginSuccStatus) {
      this.props.navigation.navigate("MainStack");
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
        <Icon
          name="github"
          color = "green"
          size = {scaleSize(200)}
          style = {styles.logo}
        />

        <InputItem
          style={styles.inputItem}
          clear
          editable={true}
          disabled={false}
          value={this.props.userName}
          onChange={value => {
            this.props.setUserName(value);
          }}
          placeholder="用户名"
        >
          <Text style={styles.inputItemLabel}>用户名</Text>
        </InputItem>
        <InputItem
          style={styles.inputItem}
          clear
          editable={true}
          disabled={false}
          value={this.props.password}
          onChange={value => {
            this.props.setPassword(value);
          }}
          placeholder="密码"
          type="password"
        >
          <Text style={styles.inputItemLabel}>密码</Text>
        </InputItem>
        <Button
          style={styles.loginButton}
          onPress={() => this.props.handlePress()}
          loading={this.props.loading}
          disabled={this.props.loading}
        >
          {this.props.loading ? "登录中..." : "登录"}
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingLeft: scaleSize(50),
    paddingRight: scaleSize(50)
  },
  logo: {
    marginBottom:scaleSize(100)
  },
  inputItem: {
    fontSize: scaleSize(34),
    alignItems: "center",
    height: scaleSize(80)
  },
  inputItemLabel: {
    fontSize: scaleSize(34),
    alignItems: "center",
    lineHeight: scaleSize(80),
    height: scaleSize(80)
  },
  loginButton: {
    marginTop: scaleSize(50),
    height: scaleSize(80),
    width: scaleSize(300)
  }
});

const mapStateToProps = state => ({
  userName: state.userName,
  password: state.password,
  loading: state.loading,
  loginSuccStatus: state.loginSuccStatus
});

const mapDispatchToProps = dispatch => ({
  setUserName: userName => {
    dispatch(setUser(userName));
  },
  setPassword: password => {
    dispatch(setPass(password));
  },
  handlePress: () => {
    dispatch(login());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
