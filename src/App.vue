<script setup>
import { onMounted } from "vue";
import { useAuth } from "./composables/useAuth";
import MainLayout from "./components/MainLayout.vue";
import HeaderActions from "./components/HeaderActions.vue";

const { isAuthenticated, checkAuth } = useAuth();

onMounted(async () => {
  if (isAuthenticated.value) {
    await checkAuth();
  }
});
</script>

<template>
  <MainLayout>
    <template #header-actions>
      <HeaderActions />
    </template>

    <RouterView />
  </MainLayout>
</template>
