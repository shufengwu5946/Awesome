import { combineReducers } from "redux";
import { userName, password, loading, loginSuccStatus, screenHeight } from "./auth";

const reducer = combineReducers({
  userName,
  password,
  loading,
  loginSuccStatus,
  screenHeight
});

export default reducer;
