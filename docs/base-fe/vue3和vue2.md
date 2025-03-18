## vue3 与 vue2 的区别

### 虚拟dom
虚拟dom 是真实 dom 的抽象，通过 js 对象来描述真实 dom，然后通过 diff 算法来比较新旧虚拟 dom 的差异，从而更新真实 dom。

### 1. 响应式原理
- vue2 使用的是 Object.defineProperty，对数据进行劫持，然后通过发布订阅模式来通知数据的变化
- vue3 使用的是 Proxy，对整个对象进行劫持，并且可以直接监听对象和数组的变化
- Proxy 的优点：
- 1. Proxy 可以直接监听对象和数组的变化，不需要像 Object.defineProperty 那样对每个属性进行劫持
- 2. Proxy 可以监听对象和数组的变化，包括新增和删除属性
- 3. Proxy 可以监听对象和数组的变化，包括对象的嵌套属性和数组的索引变化
- 4. Proxy 可以监听对象和数组的变化，包括对象的嵌套属性和数组的索引变化，不需要像 Object.defineProperty 那样对每个属性进行劫持

### 2. 性能优化
- vue3 的性能优化主要体现在以下几个方面：
- 1. 编译优化：vue3 使用了新的编译器，编译速度更快，编译结果更小
- 2. 响应式优化：vue3 使用了 Proxy，对整个对象进行劫持，并且可以直接监听对象和数组的变化，不需要像 Object.defineProperty 那样对每个属性进行劫持
- 静态提升：vue3 对静态节点进行了静态提升，减少了 DOM 操作，提高了性能
- 缓存事件处理函数：vue3 对事件处理函数进行了缓存，减少了事件处理函数的创建和销毁，提高了性能
- 3. 源码体积优化：vue3 的源码体积更小，减少了打包体积，提高了性能

### 3. Composition API
- vue3 引入了 Composition API，使得组件的代码更加清晰和可维护
- Composition API 可以将组件的逻辑拆分成多个函数，每个函数负责一个功能，使得代码更加模块化和可复用
- Composition API 可以使用响应式数据，并且可以直接在函数中使用，不需要像 Options API 那样在 data 中定义数据
- Composition API 可以使用生命周期钩子函数，并且可以直接在函数中使用，不需要像 Options API 那样在 created、mounted 等生命周期钩子函数中定义逻辑

### 4. Fragments
- vue3 支持多个根节点，不需要像 vue2 那样使用一个根节点包裹多个节点
- Fragments 可以减少 DOM 操作，提高性能

### 5. Teleport
- vue3 引入了 Teleport，可以将组件渲染到指定的 DOM 节点中，不需要像 vue2 那样使用 slot 来实现
- Teleport 可以提高组件的复用性，减少代码的冗余
```html
<teleport to="body">
  <div>
    模态框内容
  </div>
</teleport>
```

### 6. Suspense
- vue3 引入了 Suspense，可以处理异步组件的加载状态
- Suspense 可以提高组件的加载体验，避免页面出现空白或者加载失败的情况
```html
<Suspense>
  <template #default>
    <AsyncComponent />
  </template>
  <template #fallback>
    <div>Loading...</div>
  </template>
</Suspense>
```

### 7. 自定义渲染器
- vue3 提供了自定义渲染器的 API，可以自定义组件的渲染方式
- 自定义渲染器可以用于实现跨平台渲染，例如将组件渲染到 Web、Weex、小程序等平台
- 自定义渲染器可以提高组件的性能和可维护性
- 自定义渲染器可以用于实现组件的动画效果、手势识别等功能

### 8. 更好的 TypeScript 支持
- vue3 对 TypeScript 的支持更好，可以更好地利用 TypeScript 的类型检查和代码提示功能
- vue3 的源码使用 TypeScript 编写，可以更好地保证代码的质量和可维护性
- vue3 的 API 设计更加符合 TypeScript 的类型系统，可以更好地利用 TypeScript 的类型检查和代码提示功能

### 9. 更好的性能
- vue3 的性能比 vue2 更好，主要体现在以下几个方面：
- 更小的打包体积：vue3 的打包体积比 vue2 小很多，可以更快地加载和渲染页面
- 更快的虚拟 DOM：vue3 的虚拟 DOM 更快，可以更快地更新页面
- 更好的内存管理：vue3 的内存管理更优，可以更好地利用内存，减少内存泄漏的风险
- 更快的组件渲染：vue3 的组件渲染更快，可以更快地更新页面

