import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  SET_USER_NAME,
  SET_PASSWORD
} from "../constants/Actions";

export const loading = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return false;
    case LOGIN_FAIL:
      return false;
    case LOGIN_START:
      return true;
    default:
      return state;
  }
};

export const userName = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.userName;
    case LOGIN_FAIL:
      return "";
    case LOGIN_START:
      return action.userName;
    case SET_USER_NAME:
      return action.userName;
    default:
      return state;
  }
};

export const password = (state = "", action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return action.password;
    case LOGIN_FAIL:
      return "";
    case LOGIN_START:
      return action.password;
    case SET_PASSWORD:
      return action.password;
    default:
      return state;
  }
};

export const loginSuccStatus = (state = false, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return true;
    case LOGIN_FAIL:
      return false;
    default:
      return state;
  }
};
