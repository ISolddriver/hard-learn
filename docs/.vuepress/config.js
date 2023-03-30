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
        }
      ]
    }
}
