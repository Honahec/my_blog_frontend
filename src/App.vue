<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from './composables/useAuth'
import MainLayout from './components/MainLayout.vue'

const router = useRouter()
const { isAuthenticated, isStaff, user, logout, checkAuth } = useAuth()

onMounted(async () => {
  if (isAuthenticated.value) {
    await checkAuth()
  }
})
</script>

<template>
  <MainLayout>
    <template #header-actions>
      <template v-if="isAuthenticated">
        <span class="text-gray-700 mr-4">{{ user?.username }}</span>
        <router-link
          v-if="isStaff"
          to="/admin"
          class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          管理后台
        </router-link>
        <button
          @click="logout"
          class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
        >
          退出登录
        </button>
      </template>
      <router-link
        v-else
        to="/login"
        class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        登录
      </router-link>
    </template>

    <RouterView />
  </MainLayout>
</template>
