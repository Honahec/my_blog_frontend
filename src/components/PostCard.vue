<script setup>
import { format } from 'date-fns'
import TagList from './TagList.vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (date) => {
  return format(new Date(date), 'yyyy年MM月dd日')
}

const getTags = (tagString) => {
  return tagString ? tagString.split(',').map(tag => tag.trim()) : []
}
</script>

<template>
  <article class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
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
          <TagList :tags="getTags(post.tags)" size="sm" />
        </div>
      </div>
    </router-link>
  </article>
</template> 