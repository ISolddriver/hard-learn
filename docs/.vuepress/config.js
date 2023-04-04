module.exports = {
  title: "Jovi's Blob",
  description: '',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '关于', link: '/a' },
      { text: '友链', link: '/b' },
	    {
        text: '下拉菜单',
        ariaLabel: '这是提示语',
        items: [
          { text: 'todo', link: '/', target:'_self' },
          { text: 'todo', link: '/', target:'_blank' }
        ]
      }
    ],
    sidebar: [
        {
          title: 'Javascript基础',   // 必要的
          path: '',      // 可选的, 标题的跳转链接，应为绝对路径且必须存在
          collapsable: true, // 可选的, 默认值是 true,
          sidebarDepth: -1,    // 可选的, 默认值是 1
          children: [
            {
              title: '原型和原型链',
              path: '/base-js/原型和原型链'
            }
          ]
        },
        {
          title: 'CSS基础',
          path: '',
          collapsable: true,
          sidebarDepth: -1,
          children: [
            {
              title: '什么是BFC',
              path: '/base-css/BFC'
            }
          ]
        },
        {
          title: '工具方法',
          path: '',
          sidebarDepth: -1,
          children: [
            {
              title: '扁平数组转化成tree',
              path: '/base-utils/扁平数组转化成tree'
            }
          ]
        },
        {
          title: '一点儿思考',
          path: '',
          sidebarDepth: -1,
          children: [
            {
              title: '尾调用优化',
              path: '/base-thinking/尾调用优化'
            }
          ]
        }
      ]
    }
}
