import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGIN_START,
  SET_USER_NAME,
  SET_PASSWORD,
  SET_SCREEN_HEIGHT
} from "../constants/actions";
import { LOGIN_URL } from "../constants/fetch";
import { ToastAndroid } from "react-native";
import { fetchLogin } from "../fetch/index";
import { scaleSize } from "../utils/ScreenUtil";
import { LOGIN_DATA } from "../constants/asyncStorageKey";
import { storeData } from "../utils/AsyncStorageUtils";

export const setUserName = userName => ({
  type: SET_USER_NAME,
  userName
});

export const setPassword = password => ({
  type: SET_PASSWORD,
  password
});

export const loginSuccess = (userName, password, loginSuccStatus) => ({
  type: LOGIN_SUCCESS,
  userName,
  password,
  loginSuccStatus
});

export const loginFail = loginSuccStatus => ({
  type: LOGIN_FAIL,
  loginSuccStatus
});

export const loginStart = (userName, password) => ({
  type: LOGIN_START,
  userName,
  password
});

export const login = () => {
  const func = (dispatch, getState) => {
    if (getState().userName.length == 0) {
      ToastAndroid.showWithGravityAndOffset(
        "用户名不能为空！",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        scaleSize(150)
      );
      return;
    }
    if (getState().password.length === 0) {
      ToastAndroid.showWithGravityAndOffset(
        "密码不能为空！",
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        0,
        scaleSize(150)
      );
      return;
    }
    dispatch(loginStart(getState().userName, getState().password));
    fetchLogin(
      LOGIN_URL,
      getState().userName,
      getState().password,
      data => {
        console.log(data);

        ToastAndroid.showWithGravityAndOffset(
          "登录成功！",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          scaleSize(150)
        );
        dispatch(loginSuccess(getState().userName, getState().password));
        storeData(LOGIN_DATA, JSON.stringify(data));
        storeData(LOGIN_DATA, JSON.stringify(data));
      },
      () => {
        ToastAndroid.showWithGravityAndOffset(
          "登录失败！",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          0,
          scaleSize(150)
        );
        dispatch(loginFail());
      }
    );
  };
  return func;
};
