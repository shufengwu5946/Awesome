import { combineReducers } from "redux";
import { userName, password, loading, loginSuccStatus } from "./auth";

const reducer = combineReducers({
  userName,
  password,
  loading,
  loginSuccStatus
});

export default reducer;
