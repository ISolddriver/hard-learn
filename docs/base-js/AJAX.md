## AJAX
手写代码

```js
function ajax(options) {
  const {
    url,
    method = 'GET',
    data = {},
    success,
    fail,
    headers = {}
  } = options;
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  for (const key in headers) {
    xhr.setRequestHeader(key, headers[key]);
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status >= 200 && xhr.status < 300) {
        success && success(xhr.response);
      } else {
        fail && fail(xhr.status);
      }
    }
  };
  xhr.send(JSON.stringify(data));
}
```