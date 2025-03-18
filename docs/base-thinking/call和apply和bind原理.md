## call和apply和bind原理

### call

```js
Function.prototype.myCall = function (context, ...args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

### apply

```js
Function.prototype.myApply = function (context, args) {
  context = context || window;
  context.fn = this;
  const result = context.fn(...args);
  delete context.fn;
  return result;
};
```

### bind

```js
Function.prototype.myBind = function (context, ...args) {
  const self = this;
  return function (...newArgs) {
    return self.call(context, ...args, ...newArgs);
  };
};
```