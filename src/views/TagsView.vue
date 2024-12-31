<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useApi } from '../composables/useApi'

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

const tagMap = computed(() => {
  const map = new Map()
  posts.value.forEach(post => {
    if (post.tags) {
      post.tags.split(',').forEach(tag => {
        const trimmedTag = tag.trim()
        if (!map.has(trimmedTag)) {
          map.set(trimmedTag, [])
        }
        map.get(trimmedTag).push(post)
      })
    }
  })
  return map
})

const sortedTags = computed(() => {
  return Array.from(tagMap.value.keys()).sort()
})
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">标签</h1>

    <div v-if="loading" class="text-center py-12">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
    </div>

    <div v-else-if="sortedTags.length === 0" class="text-center py-12">
      <p class="text-gray-600">暂无标签</p>
    </div>

    <div v-else class="space-y-8">
      <div v-for="tag in sortedTags" :key="tag" class="bg-white shadow rounded-lg overflow-hidden">
        <div class="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 class="text-lg leading-6 font-medium text-gray-900 flex items-center">
            <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              {{ tag }}
            </span>
            <span class="ml-3 text-sm text-gray-500">
              {{ tagMap.get(tag).length }} 篇文章
            </span>
          </h3>
        </div>
        <ul class="divide-y divide-gray-200">
          <li 
            v-for="post in tagMap.get(tag)" 
            :key="post.id"
            class="px-4 py-4 hover:bg-gray-50 cursor-pointer"
            @click="router.push({ name: 'post-detail', params: { slug: post.slug }})"
          >
            <div class="flex items-center justify-between">
              <h4 class="text-lg font-medium text-gray-900">{{ post.title }}</h4>
              <span class="text-sm text-gray-500">
                {{ new Date(post.created_at).toLocaleDateString() }}
              </span>
            </div>
            <p class="mt-1 text-gray-600 line-clamp-2">{{ post.summary || post.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template> 