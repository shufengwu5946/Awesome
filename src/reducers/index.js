import { combineReducers } from "redux";
import { userName, password, loading, loginSuccStatus } from "./auth";
import { repoListType, repoListSort, repoListTypeItems } from "./repo";

const reducer = combineReducers({
  userName,
  password,
  loading,
  loginSuccStatus,
  repoListType,
  repoListSort,
  repoListTypeItems
});

export default reducer;
