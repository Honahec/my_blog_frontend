<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuth } from "../composables/useAuth";

const { isAuthenticated, isStaff, user, logout } = useAuth();
const isUserMenuOpen = ref(false);
const menuRef = ref(null);

const closeMenu = (event) => {
  if (menuRef.value && !menuRef.value.contains(event.target)) {
    isUserMenuOpen.value = false;
  }
};

onMounted(() => {
  document.addEventListener('click', closeMenu);
});

onUnmounted(() => {
  document.removeEventListener('click', closeMenu);
});
</script>

<template>
  <template v-if="isAuthenticated">
    <div class="relative" ref="menuRef">
      <router-link
        v-if="isStaff"
        to="/admin"
        class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
      >
        管理后台
      </router-link>
      <button
        @click.stop="isUserMenuOpen = !isUserMenuOpen"
        class="text-gray-700 hover:text-gray-900 mr-4"
      >
        {{ user?.username }}
      </button>
      <div
        v-if="isUserMenuOpen"
        class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
      >
        <router-link
          to="/change-password"
          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          @click="isUserMenuOpen = false"
        >
          修改密码
        </router-link>
        <button
          @click="logout"
          class="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
        >
          退出登录
        </button>
      </div>
    </div>
  </template>
  <router-link
    v-else
    to="/login"
    class="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
  >
    登录
  </router-link>
</template> 