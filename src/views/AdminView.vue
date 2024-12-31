<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'
import { format } from 'date-fns'

const router = useRouter()
const { getPosts, deletePost } = useApi()
const posts = ref([])
const loading = ref(true)

const fetchPosts = async () => {
  try {
    posts.value = await getPosts()
  } catch (error) {
    console.error('Failed to fetch posts:', error)
  } finally {
    loading.value = false
  }
}

onMounted(fetchPosts)

const formatDate = (date) => {
  return format(new Date(date), 'MMM d, yyyy')
}

const handleDelete = async (slug) => {
  if (!confirm('Are you sure you want to delete this post?')) return
  
  try {
    await deletePost(slug)
    await fetchPosts()
  } catch (error) {
    console.error('Failed to delete post:', error)
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Manage Posts</h1>
      <button
        @click="router.push({ name: 'new-post' })"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        New Post
      </button>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    </div>

    <div v-else-if="posts.length === 0" class="text-center py-12">
      <p class="text-gray-600">No posts available.</p>
    </div>

    <div v-else class="bg-white shadow overflow-hidden sm:rounded-md">
      <ul class="divide-y divide-gray-200">
        <li v-for="post in posts" :key="post.id" class="px-6 py-4 hover:bg-gray-50">
          <div class="flex items-center justify-between">
            <div class="flex-1 min-w-0">
              <div class="flex items-center">
                <p class="text-sm font-medium text-gray-900 truncate">{{ post.title }}</p>
                <span 
                  :class="[
                    'ml-2 px-2 py-1 text-xs rounded-full',
                    post.published ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  ]"
                >
                  {{ post.published ? 'Published' : 'Draft' }}
                </span>
              </div>
              <div class="mt-2 flex items-center text-sm text-gray-500">
                <span>By {{ post.author.username }}</span>
                <span class="mx-2">&middot;</span>
                <span>{{ formatDate(post.created_at) }}</span>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <button
                @click="router.push({ name: 'edit-post', params: { slug: post.slug }})"
                class="text-blue-600 hover:text-blue-900"
              >
                Edit
              </button>
              <button
                @click="handleDelete(post.slug)"
                class="text-red-600 hover:text-red-900"
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template> 