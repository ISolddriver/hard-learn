## Vuex 和 Pinia
两者都是 vue 中的状态管理工具，帮助开发者管理应用中的全局状态，并提供了一种集中式的数据管理方式。

### Vuex
- State：存储应用的状态数据。
- Getters：用于派生出一些状态，类似于计算属性。
- Mutations：同步地修改状态的方法。
- Actions：用于处理异步操作，提交 mutations，可以包含异步操作。
- Modules：将 Store 分割成模块。便于管理。


### Pinia
- State：存储应用的状态数据。
- Getters：用于派生一些状态，类似于计算属性。
- Actions：用于处理处理同步和异步操作，直接修改 State。
- Stores：用于定义 Store，类似于 Vuex 的 Modules。


### 两者的区别
- Pinia 是 Vue 3 的官方状态管理库，而 Vuex 是 Vue 2 的状态管理库。
- Pinia 使用的是 Composition API，而 Vuex 使用的是 Options API。
- Pinia 的 API 更加简洁，易于理解和使用。
- Pinia 支持热更新，而 Vuex 不支持。
- Pinia 的代码更加简洁，易于维护。
- Pinia 无需 Mutations，直接修改 State，而 Vuex 需要使用 Mutations 来修改 State。