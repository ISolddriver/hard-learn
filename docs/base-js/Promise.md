## Promise 是什么
`Promise`是一个对象，它代表了一个异步操作的最终完成（或失败）及其结果值。
### Promise 的特点
- `Promise`是一个对象，它代表了一个异步操作的最终完成（或失败）及其结果值。
- `Promise`有三种状态：pending（等待中）、fulfilled（已成功）和 rejected（已失败）。Promise 对象只能从 pending 状态变为 fulfilled 状态，或者从 pending 状态变为 rejected 状态，并且一旦状态改变，就不会再变。
- `Promise 对象的构造函数接受一个函数作为参数，该函数有两个参数：resolve 和 reject。resolve 函数用于将 Promise 对象的状态从 pending 变为 fulfilled，并传递一个值作为参数；reject 函数用于将 Promise 对象的状态从 pending 变为 rejected，并传递一个原因作为参数。
- `Promise`对象的实例方法有 then、catch 和 finally。then 方法用于指定当 Promise 对象状态变为 fulfilled 时要执行的回调函数；catch 方法用于指定当 Promise 对象状态变为 rejected 时要执行的回调函数；finally 方法用于指定无论 Promise 对象状态变为 fulfilled 还是 rejected 都要执行的回调函数。
- `Promise`对象的实例方法 then 和 catch 可以链式调用，即一个 then 方法返回的 Promise 对象可以继续调用 then 方法，或者调用 catch 方法。

### Promise 的方法
- `all`用于将多个 Promise 对象包装成一个 Promise 对象，只有当所有传入的 Promise 对象都变为 fulfilled 状态时，包装的 Promise 对象才会变为 fulfilled 状态，否则包装的 Promise 对象会变为 rejected 状态。
- `race`用于将多个 Promise 对象包装成一个 Promise 对象，返回传入的 Promise 对象中最先变为 fulfilled 状态或 rejected 状态的 Promise 对象的值。
- `allSettled`用于将多个 Promise 对象包装成一个 Promise 对象，无论传入的 Promise 对象是 fulfilled 状态还是 rejected 状态，包装的 Promise 对象都会变为 fulfilled 状态，并且会返回一个数组，数组中的每个元素都是一个对象，表示每个 Promise 对象的状态和结果。
- `any`用于将多个 Promise 对象包装成一个 Promise 对象，只要有一个传入的 Promise 对象变为 fulfilled 状态，包装的 Promise 对象就会变为 fulfilled 状态，否则包装的 Promise 对象会变为 rejected 状态。

### 手写Promise
```js
class MyPromise {
  constructor(executor) {
    this.status = "pending"; // 初始状态
    this.value = undefined; // 成功值
    this.reason = undefined; // 失败原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    const resolve = (value) => {
      if (this.status === "pending") {
        this.status = "fulfilled";
        this.value = value;
        this.onFulfilledCallbacks.forEach((fn) => fn());
      }
    };

    const reject = (reason) => {
      if (this.status === "pending") {
        this.status = "rejected";
        this.reason = reason;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };

    try {
      executor(resolve, reject); // 执行器
    } catch (error) {
      reject(error); // 捕获同步错误
    }
  }

  then(onFulfilled, onRejected) {
    const promise2 = new MyPromise((resolve, reject) => {
      if (this.status === "fulfilled") {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status === "rejected") {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        }, 0);
      } else if (this.status === "pending") {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          }, 0);
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => MyPromise.resolve(onFinally()).then(() => value),
      (reason) =>
        MyPromise.resolve(onFinally()).then(() => {
          throw reason;
        })
    );
  }

  static resolve(value) {
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }
}

// 辅助函数：处理 then 的返回值
function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("Chaining cycle detected"));
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

// 测试
const p = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve("成功"), 1000);
});

p.then((value) => {
  console.log(value); // 1 秒后输出 "成功"
  return "新的值";
}).then((value) => {
  console.log(value); // 输出 "新的值"
});
```

### 手写Promise.all，并处理错误情况
Promise.all() 方法：接收一个 Promise 实例组成的数组，如果所有的 Promise 实例都变成 fulfilled，则返回一个新的且状态为 fulfilled 的 Promise 实例，并返回传入的所有的 Promise 实例的结果数组；如果传入的实例，有一个状态值为 rejected，则返回的新的 Promise 实例状态为 rejected，并返回第一个被 rejected 的实例结果。

```js
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Expected an array"));
    }

    const results = [];
    let completedCount = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          results[index] = value;
          completedCount++;

          if (completedCount === promises.length) {
            resolve(results);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

// 测试
const p1 = Promise.resolve(1);
const p2 = Promise.resolve(2);
const p3 = Promise.reject("error");

promiseAll([p1, p2, p3])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log(error); // 输出 "error"
  })
```

### 手写Promise.race
Promise.race 方法返回一个 Promise，一旦迭代器中的某一个实例状态变换，则立即返回该实例的结果，无论其是成功还是失败。

```js
function promiseRace(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Expected an array"));
    }

    promises.forEach((promise) => {
      Promise.resolve(promise).then(res => resolve(res)).catch(reject)
    })
  })
}
```

### allSettled
Promise.allSettled() 方法返回一个 Promise实例，无论传入的数组中的 Promise 实例是成功还是失败，都会返回一个数组，数组中的每个元素都是一个对象，表示返回的状态和结果
```js
function promiseAllSettled(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Expected an array"));
    }
    const results = []
    let count = 0
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        results[index] = { status: "fulfilled", value: res }
        count++
      }).catch(err => {
        count++
        results[index] = { status: "rejected", reason: err }
      }).finally(() => {
        if (count === promises.length)
        resolve(results)
      })
    })
  })
}
```

### Promise.any
Promise.any() 方法返回一个 Promise 实例，只要传入的 Promise 实例中，有一个成功，就返回那个成功结果，如果所有传入的 Promise 实例都失败，则返回一个失败的 Promise 实例。

```js
function promiseAny(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("Expected an array"));
    }
    let count = 0;
    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(res => {
        resolve(res);
      }).catch(err => {
        count++;
        if (count === promises.length) {
          reject(new AggregateError("All promises were rejected"));
        }
      })
    })
  })
}
```

### 实现一个带并发限制的 Promise 调度器
```js
class Scheduler {
  constructor(concurrency) {
    this.concurrency = concurrency; // 并发数
    this.running = 0; // 当前正在运行的任务数
    this.queue = []; // 任务队列
  }

  // 将任务包装为一个返回 Promise 的函数，并推入队列。
  // 调用 runNext 尝试执行任务。
  add(task) {
    return new Promise((resolve, reject) => {
      const taskWrapper = () => {
        this.running++;
        task()
          .then(resolve, reject)
          .finally(() => {
            this.running--;
            this.runNext();
          });
      };

      this.queue.push(taskWrapper);
      this.runNext();
    });
  }

  // 如果当前运行的任务数小于并发数，且队列中有任务，则取出任务并执行。
  // 任务完成后，减少 running 计数，并继续执行下一个任务。
  runNext() {
    if (this.running < this.concurrency && this.queue.length > 0) {
      const task = this.queue.shift();
      task();
    }
  }
}

// 使用实例：模拟一个异步任务
const createTask = (time, name) => () =>
  new Promise(resolve => {
    console.log(`任务 ${name} 开始`);
    setTimeout(() => {
      console.log(`任务 ${name} 完成`);
      resolve();
    }, time);
  });

// 创建调度器，并发数为 2
const scheduler = new Scheduler(2);

// 添加任务
scheduler.add(createTask(1000, 'A')).then(() => console.log('A 回调'));
scheduler.add(createTask(500, 'B')).then(() => console.log('B 回调'));
scheduler.add(createTask(300, 'C')).then(() => console.log('C 回调'));
scheduler.add(createTask(400, 'D')).then(() => console.log('D 回调'));

// 输出：
// 任务 A 开始
// 任务 B 开始
// 任务 B 完成
// 任务 C 开始
// B 回调
// 任务 A 完成
// 任务 D 开始
// A 回调
// 任务 C 完成
// C 回调
// 任务 D 完成
// D 回调
```