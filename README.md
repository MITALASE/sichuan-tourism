# 四川文旅网站（2024 网页与网站设计实训作品）

一个以四川文旅为主题的静态多页面网站，纯 HTML5 + CSS3 + 原生 JavaScript 实现，无任何框架与构建工具，直接双击 `WYSXSJ.html` 即可在本地浏览。

## 页面结构

| 文件 | 页面 | 说明 |
|---|---|---|
| `WYSXSJ.html` | 四川旅游网（首页） | 主视觉 Banner、栏目入口、景点与资讯板块 |
| `shichuangs.html` | 四川概况 | 地理、人文、城市介绍 |
| `area.html` | 景区 | 景区列表与图集 |
| `lvyouzhixun.html` | 旅游资讯 | 资讯列表与正文页样式 |
| `first.html` | 资讯正文页 | 面包屑导航 + 图文正文 |

## 技术要点

- **结构与样式分离**：每个页面独立 HTML + 独立 CSS，公共的头部导航（`.header / .nav`）与页脚在各页保持一致。
- **布局**：早期使用 float 两栏布局，后在卡片列表与图文混排处改用 Flexbox。
- **响应式**：新增 `responsive.css`，桌面 / 平板（≤1024px）/ 手机（≤768px）三档断点；手机端导航折叠为菜单按钮，分栏改单列，固定宽度块收进屏幕宽度。
- **原生交互**（`main.js`，无依赖）：
  1. 导航当前页高亮
  2. 移动端汉堡菜单展开 / 收起
  3. 返回顶部按钮（滚动超过 300px 出现）
  4. 正文图片点击灯箱查看大图（支持 Esc 关闭）
  5. 基于 `IntersectionObserver` 的滚动淡入动画（并尊重 `prefers-reduced-motion`）
- **素材管理**：80 余张图片按 `图片/`、`风景图片/`、`景区/`、`尾部图片/` 等目录归类，统一命名。

## 本地预览

直接双击 `WYSXSJ.html`。若想用本地服务器预览（避免个别浏览器的文件协议限制）：

```bash
python -m http.server 8000
# 然后访问 http://localhost:8000/WYSXSJ.html
```

## 部署

可部署到 GitHub Pages / 任意静态托管：

1. 推到 GitHub 仓库（`main` 分支）
2. 仓库 Settings → Pages → Source 选 `Deploy from a branch` → 分支 `main`、目录 `/ (root)`
3. 稍等一两分钟，访问 `https://<用户名>.github.io/<仓库名>/WYSXSJ.html`

## 目录说明

```
├── WYSXSJ.html            首页
├── shichuangs.html        四川概况
├── area.html              景区
├── lvyouzhixun.html       旅游资讯
├── first.html             资讯正文
├── text.css / area.css / shichuangs.css / lvyouzhixn.css / first.css
├── responsive.css         响应式与交互组件样式（后补）
├── main.js                原生交互脚本（后补）
├── 图片/ 风景图片/ 景区/ 尾部图片/ 第二页/ 1-8/   图片素材
└── 网页与网站设计实训报告2024.pdf                实训报告
```

## 后续可扩展

- 把重复的头部 / 页脚抽成模板或改用组件化方案（Vue / React）
- 图片懒加载（`loading="lazy"`）
- 加入搜索与筛选，数据改为 JSON 驱动
