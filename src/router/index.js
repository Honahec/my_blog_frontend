import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('../views/PostsView.vue')
  },
  {
    path: '/post/:slug',
    name: 'post-detail',
    component: () => import('../views/PostDetailView.vue')
  },
  {
    path: '/tags',
    name: 'tags',
    component: () => import('../views/TagsView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/new',
    name: 'new-post',
    component: () => import('../views/PostEditorView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  },
  {
    path: '/admin/edit/:slug',
    name: 'edit-post',
    component: () => import('../views/PostEditorView.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, isStaff, checkAuth } = useAuth()
  
  // 检查认证状态
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // 如果需要认证
    if (!isAuthenticated.value) {
      // 未登录，重定向到登录页
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }
    
    // 验证token有效性
    const isValid = await checkAuth()
    if (!isValid) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }

    // 如果需要管理员权限
    if (to.matched.some(record => record.meta.requiresAdmin) && !isStaff.value) {
      next({ name: 'home' })
      return
    }
  }

  // 如果已登录且访问登录页，重定向到首页
  if (to.name === 'login' && isAuthenticated.value) {
    next({ name: 'home' })
    return
  }

  next()
})

export default router 