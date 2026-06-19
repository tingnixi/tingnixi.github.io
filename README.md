# 个人网站

### 1. 安装依赖
```bash
npm install
```

### 2. 本地开发
```bash
npm run dev
```
网站将自动打开在 `http://localhost:3000`

### 3. 构建生产版本
```bash
npm run build
```
输出到 `dist/` 文件夹

## 📂 项目结构

```
portfolio-simplified/
├── src/
│   ├── components/          # React组件
│   │   ├── nav/            # 导航栏
│   │   ├── hero/           # Hero部分（含动画）
│   │   ├── work/           # 项目展示
│   │   ├── about/          # About和Skills
│   │   ├── thoughts/       # 博客/文章
│   │   └── contact/        # 联系方式
│   ├── pages/              # 页面
│   │   └── Home.jsx        # 主页
│   ├── App.jsx             # 主应用
│   ├── main.jsx            # 入口
│   └── index.css           # 全局样式
├── index.html              # HTML模板
├── vite.config.js          # Vite配置
├── tailwind.config.js      # Tailwind配置
├── postcss.config.js       # PostCSS配置
└── package.json            # 依赖项
```

## 🛠️ 依赖说明

### 核心库
- **react** & **react-dom** - UI框架
- **react-router-dom** - 路由（可选，目前只有单页）
- **framer-motion** - 动画库
- **lucide-react** - 图标库

### 样式
- **tailwindcss** - CSS框架
- **postcss** - CSS处理
- **autoprefixer** - 浏览器兼容性

### 构建工具
- **vite** - 快速构建工具
- **@vitejs/plugin-react** - React支持

## 🎨 自定义你的内容

### 修改Hero文本
编辑 `src/components/hero/HeroSection.jsx`
```jsx
<h1>YourName</h1>
<p>Your description here</p>
```

### 更新项目列表
编辑 `src/components/work/WorkSection.jsx`
```javascript
const PROJECTS = [
  {
    title: 'Your Project',
    description: '...',
    tags: ['Tag1', 'Tag2'],
    link: 'https://...'
  },
  // ...
]
```

### 修改技能清单
编辑 `src/components/about/SkillsSection.jsx`
```javascript
const SKILLS = {
  'Languages': ['Your', 'Skills', 'Here'],
  // ...
}
```

### 更新博客文章
编辑 `src/components/thoughts/ThoughtsSection.jsx`
```javascript
const THOUGHTS = [
  {
    title: 'Article Title',
    excerpt: 'Description',
    date: 'Month Year',
    tags: ['tag1'],
    link: 'https://...'
  },
  // ...
]
```

### 修改联系信息
编辑 `src/components/contact/ContactFooter.jsx`
```jsx
<a href="mailto:your@email.com">your@email.com</a>
```

## 🎯 颜色主题

主要颜色：`#CCFF00`（亮绿色）
背景色：`#000000`（黑色）

修改颜色主题：
1. 编辑 `src/index.css` 中的CSS变量
2. 或在各组件中查找 `#CCFF00` 替换成你的颜色

## 📤 部署到Github Pages

### 方式1：使用Github Actions自动部署

1. 创建 `.github/workflows/deploy.yml`：
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm install
      
      - name: Build
        run: npm run build
      
      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

2. 在 `vite.config.js` 中添加：
```javascript
export default defineConfig({
  base: '/your-repo-name/',  // 如果是用户网站可以不要
  // ...
})
```

3. Push到Github，自动部署！

### 方式2：手动部署

```bash
# 构建
npm run build

# 将dist文件夹上传到Github Pages
# 在仓库Settings -> Pages -> 选择deploy from branch -> gh-pages分支
```

## ⚙️ 常见问题

**Q: 如何添加新的页面？**
A: 在 `src/pages/` 创建新文件，在 `App.jsx` 中添加路由：
```jsx
<Route path="/new-page" element={<NewPage />} />
```

**Q: 如何修改字体？**
A: 编辑 `src/index.css` 中的 `@import` 语句

**Q: 动画太快/太慢？**
A: 在各组件中的 `transition={{ duration: X }}` 修改，数值越大越慢

**Q: 如何添加SEO？**
A: 在 `index.html` 修改 `<title>` 和 `<meta>` 标签

## 📝 文件修改清单

如果你想从你的原始项目迁移，这些文件需要修改：

- [ ] 个人信息（名字、邮箱、位置）
- [ ] About部分的自我介绍
- [ ] 项目列表（Work Section）
- [ ] 技能列表（Skills）
- [ ] 博客文章（Thoughts）
- [ ] 社交链接（LinkedIn, GitHub等）
- [ ] 颜色主题（如需要）

## 📞 需要帮助？

这个简化版本完全是静态的，不需要任何后端服务。所有内容都可以直接在代码中修改。

---
