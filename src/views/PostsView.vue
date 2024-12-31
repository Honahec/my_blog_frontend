<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'
import SearchBar from '../components/SearchBar.vue'
import { format } from 'date-fns'

const { api } = useApi()
const posts = ref([])
const loading = ref(false)
const error = ref(null)

const fetchPosts = async (searchParams = '') => {
  loading.value = true
  error.value = null
  try {
    const response = await api.get(`/posts/?${searchParams}`)
    posts.value = response.data
  } catch (err) {
    console.error('Failed to fetch posts:', err)
    error.value = '获取文章列表失败'
  } finally {
    loading.value = false
  }
}

const handleSearch = (searchParams) => {
  fetchPosts(searchParams)
}

const formatDate = (date) => {
  return format(new Date(date), 'yyyy年MM月dd日')
}

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>
      <SearchBar @search="handleSearch" />
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="flex justify-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
    </div>

    <!-- 错误提示 -->
    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <!-- 无结果提示 -->
    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-gray-500">没有找到相关文章</p>
    </div>

    <!-- 文章列表 -->
    <div v-else class="space-y-6">
      <article
        v-for="post in posts"
        :key="post.id"
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
      >
        <router-link :to="{ name: 'post-detail', params: { slug: post.slug }}">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <h2 class="text-xl font-semibold text-gray-900">{{ post.title }}</h2>
              <span class="text-sm text-gray-500">{{ formatDate(post.created_at) }}</span>
            </div>
            
            <p class="text-gray-600 mb-4 line-clamp-3">{{ post.summary || post.content }}</p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <span class="text-sm text-gray-500">作者：{{ post.author.username }}</span>
              </div>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in post.tags ? post.tags.split(',') : []"
                  :key="tag"
                  class="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
                >
                  {{ tag.trim() }}
                </span>
              </div>
            </div>
          </div>
        </router-link>
      </article>
    </div>
  </div>
</template> 