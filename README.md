# README

模仿一点网易云音乐的写法：

1. 构建一个基础网页 `core.html`，其中没有任何信息
2. 这一网页中引用的 `core.js` 会为每个特定网页`abcd.html` 引用同名的 `abcd.js`（`core.html` 特判省略）
3. 在这一 `abcd.js` 中会为 `abcd.html` 引入必要的组件，并生成整个网页的结构
4. 网页启动时，先进入 `index.html`，
