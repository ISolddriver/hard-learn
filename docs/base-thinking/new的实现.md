## 实现new关键字
### new 关键词的作用

- 创建一个空对象obj
- 为obj添加新属性__proto__，并将其指向构造函数的prototype
- 改变obj的this指向，经this上下文指向obj
- 如果该函数没有返回对象，就返回this，反之，return函数返回的对象

>new的核心作用 -> 基于构造函数创建一个新对象，并建立原型链继承关系。

```js
  function myNew (fn, ...args) {
  // 验证 fn 是否为函数
  if (typeof fn !== 'function') {
    throw new TypeError('fn must be a function')
  }
  // 创建一个新对象，并基于fn的构造函数，建立原型链继承关系
  // 函数的prototype属性指向原型对象
  const obj = Object.create(fn.prototype)
  // 执行构造函数，将this指向新对象，并传入参数
  const result = fn.call(obj, ...args)
  // 如果构造函数返回一个对象，则返回该对象，否则返回新对象
  return result instanceof Object ? result : obj
}
```