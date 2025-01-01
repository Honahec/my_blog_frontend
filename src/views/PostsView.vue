<script setup>
import { ref, onMounted } from 'vue'
import { useApi } from '../composables/useApi'
import PostList from '../components/PostList.vue'
import PostCard from '../components/PostCard.vue'
import LoadingState from '../components/LoadingState.vue'

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

onMounted(() => {
  fetchPosts()
})
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-4">所有文章</h1>
      <PostList @search="handleSearch" />
    </div>

    <LoadingState v-if="loading" />

    <div v-else-if="error" class="text-center py-12">
      <p class="text-red-600">{{ error }}</p>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-gray-500">没有找到相关文章</p>
    </div>

    <div v-else class="space-y-6">
      <PostCard
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </div>
  </div>
</template> 