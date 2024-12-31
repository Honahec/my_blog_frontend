<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  Bars3Icon, 
  XMarkIcon, 
  HomeIcon, 
  DocumentTextIcon, 
  UserIcon, 
  TagIcon, 
  MagnifyingGlassIcon 
} from '@heroicons/vue/24/outline'

const router = useRouter()
const sidebarOpen = ref(false)

const navigation = [
  { name: '首页', to: '/', icon: HomeIcon },
  { name: '全部文章', to: '/posts', icon: DocumentTextIcon },
  { name: '标签', to: '/tags', icon: TagIcon },
  { name: '关于', to: '/about', icon: UserIcon },
]

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

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
  <div class="min-h-screen bg-gray-100">
    <!-- Mobile sidebar -->
    <div class="lg:hidden">
      <div class="fixed inset-0 flex z-40" v-if="sidebarOpen">
        <div class="fixed inset-0 bg-gray-600 bg-opacity-75" @click="toggleSidebar"></div>
        <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white">
          <div class="absolute top-0 right-0 -mr-12 pt-2">
            <button
              class="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              @click="toggleSidebar"
            >
              <XMarkIcon class="h-6 w-6 text-white" />
            </button>
          </div>
          <div class="flex-shrink-0 flex items-center px-4 py-4 border-b border-gray-200">
            <h1 class="text-xl font-bold text-gray-900">My Blog</h1>
          </div>
          <nav class="flex-1 px-2 py-4">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="flex items-center px-2 py-2 text-base font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              active-class="bg-gray-100 text-gray-900"
            >
              <component :is="item.icon" class="mr-4 flex-shrink-0 h-6 w-6" />
              {{ item.name }}
            </router-link>
          </nav>
        </div>
      </div>
    </div>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
      <div class="flex flex-col flex-grow bg-white border-r border-gray-200 pt-5 pb-4 overflow-y-auto">
        <div class="flex items-center flex-shrink-0 px-4">
          <h1 class="text-xl font-bold text-gray-900">My Blog</h1>
        </div>
        <nav class="mt-5 flex-1 flex flex-col divide-y divide-gray-200 overflow-y-auto">
          <div class="px-2 space-y-1">
            <router-link
              v-for="item in navigation"
              :key="item.name"
              :to="item.to"
              class="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              active-class="bg-gray-100 text-gray-900"
            >
              <component :is="item.icon" class="mr-3 flex-shrink-0 h-6 w-6" />
              {{ item.name }}
            </router-link>
          </div>
        </nav>
      </div>
    </div>

    <!-- Main content -->
    <div class="lg:pl-64">
      <!-- Top navigation -->
      <div class="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
        <button
          type="button"
          class="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden"
          @click="toggleSidebar"
        >
          <span class="sr-only">打开侧边栏</span>
          <Bars3Icon class="h-6 w-6" />
        </button>
        <div class="flex flex-1 justify-between px-4">
          <div class="flex flex-1">
            <div class="flex w-full md:ml-0">
              <div class="relative w-full max-w-2xl my-3.5">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  placeholder="搜索文章..."
                  class="block w-full rounded-md border-0 py-1.5 pl-10 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div class="ml-4 flex items-center md:ml-6">
            <slot name="header-actions"></slot>
          </div>
        </div>
      </div>

      <!-- Main content area -->
      <main class="flex-1">
        <div class="py-6">
          <div class="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div class="flex">
              <!-- Main content -->
              <div class="flex-1">
                <slot></slot>
              </div>
              
              <!-- Right sidebar -->
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
                    <div class="flex flex-wrap gap-2">
                      <router-link
                        v-for="tag in popularTags"
                        :key="tag"
                        :to="{ name: 'tags' }"
                        class="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm hover:bg-gray-200"
                      >
                        {{ tag }}
                      </router-link>
                    </div>
                  </section>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  @apply bg-gray-100 text-gray-900;
}
</style> 