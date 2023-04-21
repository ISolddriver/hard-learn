## 实现new关键字
### new 关键词的作用

- 创建一个空对象obj
- 为obj添加新属性__proto__，并将其指向构造函数的prototype
- 改变obj的this指向，经this上下文指向obj
- 如果该函数没有返回对象，就返回this，反之，return函数返回的对象

>new 创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例

```
  function _new (fn, ...arguments) {
    if (typeof fn !== 'Function') {
      throw Error('fn is not a constructor')
    }
    const obj = Object.create(fn.prototype)
    const result = fn.apply(obj, ...arguments)
    return typeof result === 'object' && result !== null ? result : obj
  }
```