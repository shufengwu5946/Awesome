import {
  SET_REPO_LIST_TYPE,
  SET_REPO_LIST_SORT,
  SET_REPO_LIST_SORT_ITEMS
} from "~/constants/Actions";

export const setRepoListType = repoListType => ({
  type: SET_REPO_LIST_TYPE,
  repoListType
});

export const setRepoListSort = repoListSort => ({
  type: SET_REPO_LIST_SORT,
  repoListSort
});

export const setRepoListTypeItems = repoListTypeItems => ({
  type: SET_REPO_LIST_SORT_ITEMS,
  repoListTypeItems
});

export const loadRepoList = () => {
    const func = (dispatch, getState) => {
      if (getState().userName.length == 0) {
        toast(TOAST_USER_NAME_NOT_EMPTY);
        return;
      }
      if (getState().password.length === 0) {
        toast(TOAST_PASSWORD_NOT_EMPTY);
        return;
      }
      dispatch(loginStart(getState().userName, getState().password));
      fetchLogin(LOGIN_URL, getState().userName, getState().password)
        .then(data => {
          toast(TOAST_LOGIN_SUCCESS);
          dispatch(loginSuccess(getState().userName, getState().password));
          storeData(LOGIN_DATA, JSON.stringify(data));
          storeData(PASSWORD, getState().password);
        })
        .catch(() => {
          toast(TOAST_LOGIN_FAIL);
          dispatch(loginFail());
        });
    };
    return func;
  };
