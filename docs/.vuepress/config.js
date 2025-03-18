module.exports = {
  title: "Jovi's Blob",
  description: "",
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "关于", link: "/about" },
      { text: "友链", link: "/friend" },
      {
        text: "下拉菜单",
        ariaLabel: "这是提示语",
        items: [
          { text: "todo", link: "/", target: "_self" },
          { text: "todo", link: "/", target: "_blank" },
        ],
      },
    ],
    sidebar: [
      {
        title: "Javascript基础", // 必要的
        path: "", // 可选的, 标题的跳转链接，应为绝对路径且必须存在
        collapsable: true, // 可选的, 默认值是 true,
        sidebarDepth: -1, // 可选的, 默认值是 1
        children: [
          {
            title: "原型和原型链",
            path: "/base-js/原型和原型链",
          },
          {
            title: "继承",
            path: "/base-js/继承",
          },
          {
            title: "堆和栈",
            path: "/base-js/堆和栈",
          },
          {
            title: "闭包",
            path: "/base-js/闭包",
          },
          {
            title: "冒泡和捕获",
            path: "/base-js/冒泡和捕获",
          },
          {
            title: "Promise",
            path: "/base-js/Promise",
          },
          {
            title: "AJAX",
            path: "/base-js/AJAX",
          },
        ],
      },
      {
        title: "CSS基础",
        path: "",
        collapsable: true,
        sidebarDepth: -1,
        children: [
          {
            title: "什么是BFC",
            path: "/base-css/BFC",
          },
          {
            title: "移动端1px边框",
            path: "/base-css/移动端1px边框",
          },
          {
            title: "垂直水平居中",
            path: "/base-css/垂直水平居中",
          },
          {
            title: "预处理器有哪些好处",
            path: "/base-css/预处理器有哪些好处",
          },
          {
            title: "实现一个模态框组件",
            path: "/base-css/实现一个模态框组件",
          },
          {
            title: "一键换肤",
            path: "/base-css/一键换肤",
          },
        ],
      },
      {
        title: "关于前端框架",
        path: "",
        collapsable: true,
        sidebarDepth: -1,
        children: [
          {
            title: "双向绑定原理",
            path: "/base-fe/双向绑定原理",
          },
          {
            title: "vue3和vue2",
            path: "/base-fe/vue3和vue2",
          },
          {
            title: "vue3相关总结",
            path: "/base-fe/vue3相关总结",
          },
          {
            title: "Diff算法实现原理",
            path: "/base-fe/Diff算法实现原理",
          },
          {
            title: "Vuex和Pinia",
            path: "/base-fe/Vuex和Pinia",
          },
          {
            title: "vue路由守卫",
            path: "/base-fe/vue路由守卫",
          },
          {
            title: "指令和插件",
            path: "/base-fe/指令和插件",
          },
        ],
      },
      {
        title: "关于构建工具",
        path: "",
        collapsable: true,
        sidebarDepth: -1,
        children: [
          {
            title: "webpack",
            path: "/base-build/webpack相关",
          },
          {
            title: "vite",
            path: "/base-build/vite相关",
          },
        ],
      },
      {
        title: "工具方法",
        path: "",
        sidebarDepth: -1,
        children: [
          {
            title: "扁平数组转化成tree",
            path: "/base-utils/扁平数组转化成tree",
          },
          {
            title: "防抖和节流",
            path: "/base-utils/防抖和节流",
          },
          {
            title: "正则表达式",
            path: "/base-utils/正则表达式",
          },
        ],
      },
      {
        title: "一点儿思考",
        path: "",
        sidebarDepth: -1,
        children: [
          {
            title: "尾调用优化",
            path: "/base-thinking/尾调用优化",
          },
          {
            title: "call和apply和bind原理",
            path: "/base-thinking/call和apply和bind原理",
          },
          {
            title: "new的实现",
            path: "/base-thinking/new的实现",
          },
          {
            title: "函数柯理化",
            path: "/base-thinking/函数柯理化",
          },
          {
            title: "深拷贝",
            path: "/base-thinking/深拷贝",
          },
          {
            title: "观察者模式和发布订阅",
            path: "/base-thinking/观察者模式和发布订阅",
          },
          {
            title: "浏览器存储",
            path: "/base-thinking/浏览器存储",
          },
          {
            title: "路由实现机制",
            path: "/base-thinking/路由实现机制",
          },
          {
            title: "关于HTTP",
            path: "/base-thinking/关于HTTP",
          },
        ],
      },
      {
        title: "leetcode算法",
        path: "",
        sidebarDepth: -1,
        children: [
          {
            title: "合并两个有序数组",
            path: "/base-leetcode/合并两个有序数组",
          },
          {
            title: "两数之和",
            path: "/base-leetcode/两数之和",
          },
          {
            title: "判断子序列",
            path: "/base-leetcode/判断子序列",
          },
          {
            title: "删除有序数组中的重复项",
            path: "/base-leetcode/删除有序数组中的重复项",
          },
          {
            title: "数组去重",
            path: "/base-leetcode/数组去重",
          },
          {
            title: "验证回文串",
            path: "/base-leetcode/验证回文串",
          },
          {
            title: "移除元素",
            path: "/base-leetcode/移除元素",
          },
          {
            title: "有效的括号匹配",
            path: "/base-leetcode/有效的括号匹配",
          },
          {
            title: "长度最小的子数组",
            path: "/base-leetcode/长度最小的子数组",
          },
        ],
      },
    ],
  },
};
