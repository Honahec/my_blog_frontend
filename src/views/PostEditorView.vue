<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'
import { marked } from 'marked'

const route = useRoute()
const router = useRouter()
const { getPost, createPost, updatePost } = useApi()

const post = ref({
  title: '',
  content: '',
  summary: '',
  featured_image: '',
  tags: '',
  published: false,
  author_id: 1 // Default to first user, should be updated with actual user ID
})

const loading = ref(false)
const isEditing = ref(false)
const previewMode = ref(false)

onMounted(async () => {
  if (route.params.slug) {
    isEditing.value = true
    loading.value = true
    try {
      const data = await getPost(route.params.slug)
      post.value = {
        ...data,
        tags: data.tags || '',
        author_id: data.author.id
      }
    } catch (error) {
      console.error('Failed to fetch post:', error)
      router.push('/admin')
    } finally {
      loading.value = false
    }
  }
})

const handleSubmit = async () => {
  loading.value = true
  try {
    if (isEditing.value) {
      await updatePost(route.params.slug, post.value)
    } else {
      await createPost(post.value)
    }
    router.push('/admin')
  } catch (error) {
    console.error('Failed to save post:', error)
  } finally {
    loading.value = false
  }
}

const renderMarkdown = (content) => {
  return marked(content)
}
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">
        {{ isEditing ? 'Edit Post' : 'New Post' }}
      </h1>
      <button
        @click="previewMode = !previewMode"
        class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
      >
        {{ previewMode ? 'Edit' : 'Preview' }}
      </button>
    </div>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    </div>

    <div v-else>
      <div v-if="!previewMode" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            v-model="post.title"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
          <textarea
            id="summary"
            v-model="post.summary"
            rows="3"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700">Content (Markdown)</label>
          <textarea
            id="content"
            v-model="post.content"
            rows="12"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 font-mono"
          ></textarea>
        </div>

        <div>
          <label for="featured_image" class="block text-sm font-medium text-gray-700">Featured Image URL</label>
          <input
            type="url"
            id="featured_image"
            v-model="post.featured_image"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div>
          <label for="tags" class="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
          <input
            type="text"
            id="tags"
            v-model="post.tags"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
        </div>

        <div class="flex items-center">
          <input
            type="checkbox"
            id="published"
            v-model="post.published"
            class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          >
          <label for="published" class="ml-2 block text-sm text-gray-900">Publish immediately</label>
        </div>
      </div>

      <div v-else class="prose prose-lg mx-auto">
        <h1>{{ post.title }}</h1>
        <div v-if="post.featured_image" class="my-6">
          <img :src="post.featured_image" :alt="post.title" class="rounded-lg shadow-lg">
        </div>
        <div v-html="renderMarkdown(post.content)"></div>
      </div>

      <div class="mt-8 flex justify-end space-x-4">
        <button
          @click="router.push('/admin')"
          class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          @click="handleSubmit"
          class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          :disabled="loading"
        >
          {{ loading ? 'Saving...' : 'Save' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.prose img {
  @apply rounded-lg shadow-md;
}
</style> 