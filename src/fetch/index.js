import base64 from "base-64";

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

function handleResponse(response) {
  const contentType = response.headers.get("content-type");
  if (contentType.includes("application/json")) {
    return handleJSONResponse(response);
  }
  throw new Error(`Sorry, content-type ${contentType} not supported`);
}

export function fetchLogin(url, userName, password, func, funcError) {
  fetch(url, {
    method: "get",
    headers: {
      Authorization: `Basic ${base64.encode(`${userName}:${password}`)}`
    }
  })
    .then(handleResponse)
    .then(data => {
      func(data);
    })
    .catch(error => {
      funcError(error);
    });
}

export function fetchGet(url, userName, password, params ,func, funcError) {
  let paramArr = [];
  Object.keys(params).forEach(function (key) {
    paramArr.push(`${key}=${params[key]}`);
  });
  fetch(`${url}?${paramArr.join('&')}`, {
    method: "get",
    headers: {
      Authorization: `Basic ${base64.encode(`${userName}:${password}`)}`
    }
  })
    .then(handleResponse)
    .then(data => {
      func(data);
    })
    .catch(error => {
      funcError(error);
    });
}
