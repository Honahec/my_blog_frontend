<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'
import { marked } from 'marked'
import { format } from 'date-fns'

const route = useRoute()
const router = useRouter()
const { getPost } = useApi()
const post = ref(null)
const loading = ref(true)

onMounted(async () => {
  try {
    post.value = await getPost(route.params.slug)
  } catch (error) {
    console.error('Failed to fetch post:', error)
    router.push('/')
  } finally {
    loading.value = false
  }
})

const formatDate = (date) => {
  return format(new Date(date), 'MMMM d, yyyy')
}

const renderMarkdown = (content) => {
  return marked(content)
}
</script>

<template>
  <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    </div>

    <article v-else-if="post" class="prose prose-lg mx-auto">
      <img 
        v-if="post.featured_image" 
        :src="post.featured_image" 
        :alt="post.title"
        class="w-full h-64 object-cover rounded-lg shadow-lg mb-8"
      >
      
      <header class="mb-8">
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ post.title }}</h1>
        <div class="flex items-center justify-between text-gray-600">
          <span>By {{ post.author.username }}</span>
          <span>{{ formatDate(post.created_at) }}</span>
        </div>
      </header>

      <div 
        class="prose prose-lg prose-blue"
        v-html="renderMarkdown(post.content)"
      ></div>

      <footer class="mt-8 pt-8 border-t border-gray-200">
        <div v-if="post.tags" class="flex gap-2">
          <span 
            v-for="tag in post.tags.split(',')" 
            :key="tag"
            class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
          >
            {{ tag.trim() }}
          </span>
        </div>
      </footer>
    </article>

    <div v-else class="text-center py-12">
      <p class="text-gray-600">Post not found.</p>
      <button 
        @click="router.push('/')"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        Return to Home
      </button>
    </div>
  </main>
</template>

<style>
.prose img {
  @apply rounded-lg shadow-md;
}
</style> 