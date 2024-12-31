# Blog Frontend

基于 Vue 3 和 Tailwind CSS 构建的现代化博客前端。

## 技术栈

- Vue 3 (Composition API)
- Vite
- Tailwind CSS
- Vue Router
- Axios
- date-fns
- Marked (Markdown 渲染)

## 功能特性

- 响应式设计
  - 移动端适配
  - 桌面端优化
  - 流畅的过渡动画

- 文章功能
  - 文章列表展示
  - 文章详情页
  - Markdown 渲染
  - 标签系统
  - 搜索和筛选

- 用户功能
  - 用户认证（登录/注册）
  - 管理员后台
  - 权限控制

- 搜索系统
  - 标题搜索
  - 标签筛选
  - 日期范围筛选

## 开发环境设置

1. 安装依赖：
```bash
pnpm install
```

2. 启动开发服务器：
```bash
pnpm run dev
```

3. 构建生产版本：
```bash
pnpm run build
```

## 项目结构

```
src/
├── assets/          # 静态资源
├── components/      # 可复用组件
├── composables/     # 组合式函数
├── router/          # 路由配置
├── views/           # 页面组件
└── App.vue          # 根组件
```

### 主要组件

- `MainLayout.vue`: 主布局组件
- `SearchBar.vue`: 搜索和筛选组件
- `PostCard.vue`: 文章卡片组件
- `LoginForm.vue`: 登录表单组件

### 视图组件

- `HomeView.vue`: 首页
- `PostsView.vue`: 文章列表页
- `PostDetailView.vue`: 文章详情页
- `TagsView.vue`: 标签页
- `AboutView.vue`: 关于页面
- `AdminView.vue`: 管理后台
- `LoginView.vue`: 登录页面

## 开发规范

1. 组件命名
   - 使用 PascalCase
   - 页面组件以 View 结尾
   - 通用组件放在 components 目录

2. 样式规范
   - 使用 Tailwind CSS 工具类
   - 避免编写自定义 CSS
   - 保持一致的间距和颜色

3. 代码组织
   - 使用 Composition API
   - 逻辑提取到 composables
   - 保持组件的单一职责

4. Git 提交规范
   - 使用清晰的提交信息
   - 遵循语义化版本控制

## 环境变量

创建 `.env` 文件：

```env
VITE_API_BASE_URL=http://localhost:8000/api
```

## 部署

1. 构建生产版本：
```bash
pnpm run build
```

2. 配置 Web 服务器（如 Nginx）：
```nginx
location / {
    root /path/to/dist;
    try_files $uri $uri/ /index.html;
}
```

3. 配置环境变量
4. 设置 SSL 证书

## 浏览器支持

- Chrome (最新版)
- Firefox (最新版)
- Safari (最新版)
- Edge (最新版)

## 性能优化

1. 路由懒加载
2. 图片懒加载
3. 组件按需加载
4. 合理的缓存策略
5. 代码分割
