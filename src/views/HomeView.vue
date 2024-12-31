<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'
import { format } from 'date-fns'

const router = useRouter()
const { getPublishedPosts } = useApi()
const posts = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    posts.value = await getPublishedPosts()
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loading.value = false
  }
})

const formatDate = (date) => {
  return format(new Date(date), 'MMMM d, yyyy')
}
</script>

<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">Welcome to My Blog</h1>
      <p class="text-xl text-gray-600">Discover interesting stories and insights</p>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-gray-600">No posts available yet.</p>
    </div>

    <div v-else class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      <article 
        v-for="post in posts" 
        :key="post.id" 
        class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
        @click="router.push({ name: 'post-detail', params: { slug: post.slug }})"
      >
        <img 
          v-if="post.featured_image" 
          :src="post.featured_image" 
          :alt="post.title"
          class="w-full h-48 object-cover"
        >
        <div class="p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ post.title }}</h2>
          <p class="text-gray-600 mb-4 line-clamp-3">{{ post.summary || post.content }}</p>
          <div class="flex items-center justify-between text-sm text-gray-500">
            <span>By {{ post.author.username }}</span>
            <span>{{ formatDate(post.created_at) }}</span>
          </div>
        </div>
      </article>
    </div>
  </main>
</template> 