## 扁平化数组转化成tree
如题：将下列数组转化成层级tree结构
```
  let arr = [
    {id: 1, name: '部门1', pid: 0},
    {id: 2, name: '部门2', pid: 1},
    {id: 3, name: '部门3', pid: 1},
    {id: 4, name: '部门4', pid: 3},
    {id: 5, name: '部门5', pid: 4}
  ]
```
### 方法1，不考虑性能，直接递归
```
  const getChildren = (data, result, pid) => {
    for (const item of data) (
      if (item.pid === pid) {
        const newItem = {
          ...item,
          children: []
        }
        result.push(newItem)
        getChildren(data, newItem.children, item.id)
      }
    )
  }

  const arrayToTree = (data, pid) => {
    const result = []
    getChildren(data, result, pid)
    return result
  }
```
### 方法2，优化性能
```
  function arrayToTree(items) {
    const result = [];   // 存放结果集
    const itemMap = {};  // 
    for (const item of items) {
      const id = item.id;
      const pid = item.pid;

      if (!itemMap[id]) {
        itemMap[id] = {
          children: [],
        }
      }

      itemMap[id] = {
        ...item,
        children: itemMap[id]['children']
      }

      const treeItem =  itemMap[id];

      if (pid === 0) {
        result.push(treeItem);
      } else {
        if (!itemMap[pid]) {
          itemMap[pid] = {
            children: [],
          }
        }
        itemMap[pid].children.push(treeItem)
      }

    }
    return result;
  }
```