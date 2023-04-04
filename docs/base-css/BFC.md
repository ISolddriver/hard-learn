## 什么是BFC?

### 首先理解BFC概念
`BFC`（Block Formatting Context），即`块及格式化上下文`，是独立于页面的一块渲染区域，并有一套独立的渲染规则：
- 内部元素会按照竖直方向依次排列
- 同一个BFC内，相邻的元素margin会重叠，与方向无关
- 每个元素的左外边距会与包含块的左边界相接（从左到右），浮动元素也是如此
- BFC的区域不会与浮动区域相互重叠
- 计算BFC元素高度时，浮动元素也参与计算
- BFC是一个独立容器，里面的元素不会影响外面，外面也不会影响里面，两者相互隔离

`BFC` 目的是形成一个相对于外界的独立空间，让内部的元素不受外界影响。

### 触发条件
触发`BFC`的条件，包含不限于以下：
- 根元素，即HTML元素
- 浮动元素，flaot值为left / right
- overflow 的值不为visible
- display 的值为 flex，inline-block，table，gird等
- position 的值为 absolute / fixed