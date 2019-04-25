import {
  setUserName as setUser,
  setPassword as setPass,
  login
} from "~/actions/Auth";
import { connect } from "react-redux";
import Login from "../components/Login";
import { authorizations } from "../../../actions/Auth";

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
