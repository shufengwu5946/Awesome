export const LOGIN_URL = "https://api.github.com/user";
export const STARRED_URL = "https://api.github.com/user/starred";
export const EVENTS_URL = username =>
  `https://api.github.com/users/${username}/events`;
export const README_URL = (title, author) =>
  `https://api.github.com/repos/${author}/${title}/readme`;
export const REPOS_URL = author =>
  `https://api.github.com/users/${author}/repos`;
