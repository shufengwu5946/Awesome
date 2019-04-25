// import base64 from "base-64";
import { Base64 } from "js-base64";

function handleJSONResponse(response) {
  return response.json().then(json => {
    if (response.ok) {
      return json;
    }
    return Promise.reject(
      Object.assign({}, json, {
        status: response.status,
        statusText: response.statusText
      })
    );
  });
}

function handleGithubHtmlResponse(response) {
  return response.text().then(text => {
    if (response.ok) {
      return text;
    }
    return Promise.reject(
      Object.assign({}, text, {
        status: response.status,
        statusText: response.statusText
      })
    );
  });
}

function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType.includes("application/json")) {
    return handleJSONResponse(response);
  } else if (contentType.includes("application/vnd.github.VERSION.html")) {
    return handleGithubHtmlResponse(response);
  }
  throw new Error(`Sorry, content-type ${contentType} not supported`);
}

export const fetchGet = (url, headers, params) => {
  let paramArr = [];
  Object.keys(params).forEach(function(key) {
    paramArr.push(`${key}=${params[key]}`);
  });
  console.log(`${url}?${paramArr.join("&")}`);

  return fetch(`${url}?${paramArr.join("&")}`, {
    method: "get",
    headers: headers
  }).then(handleResponse);
};

export const fetchPost = (url, headers, body) => {
  return fetch(url, {
    method: "post",
    headers: headers,
    body: JSON.stringify(body)
  }).then(handleResponse);
};
