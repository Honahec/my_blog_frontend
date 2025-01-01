<script setup>
import { ref } from 'vue'
import TagList from './TagList.vue'

const recentPosts = ref([
  { title: '最近文章1', slug: 'post-1' },
  { title: '最近文章2', slug: 'post-2' },
  { title: '最近文章3', slug: 'post-3' },
])

const popularTags = ref([
  '技术', '生活', '编程', '随笔'
])
</script>

<template>
  <aside class="hidden xl:block xl:pl-8 xl:w-96">
    <div class="sticky top-24">
      <!-- Recent posts -->
      <section class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">最近文章</h2>
        <ul class="space-y-3">
          <li v-for="post in recentPosts" :key="post.slug">
            <router-link
              :to="{ name: 'post-detail', params: { slug: post.slug }}"
              class="text-gray-600 hover:text-gray-900 text-sm"
            >
              {{ post.title }}
            </router-link>
          </li>
        </ul>
      </section>

      <!-- Popular tags -->
      <section class="bg-white rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-medium text-gray-900 mb-4">热门标签</h2>
        <TagList :tags="popularTags" size="md" />
      </section>
    </div>
  </aside>
</template> 