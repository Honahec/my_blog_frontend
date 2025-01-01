<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">修改密码</h2>
    
    <div v-if="message" :class="['p-4 mb-4 rounded', messageClass]">
      {{ message }}
    </div>

    <form @submit.prevent="changePassword" class="space-y-4">
      <div>
        <label for="oldPassword" class="block text-sm font-medium text-gray-700">当前密码</label>
        <input
          type="password"
          id="oldPassword"
          v-model="oldPassword"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="newPassword" class="block text-sm font-medium text-gray-700">新密码</label>
        <input
          type="password"
          id="newPassword"
          v-model="newPassword"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label for="confirmPassword" class="block text-sm font-medium text-gray-700">确认新密码</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="confirmPassword"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <button
        type="submit"
        :disabled="isLoading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
      >
        {{ isLoading ? '提交中...' : '修改密码' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../composables/useAuth'

const { changePassword: changePasswordApi } = useAuth()

const oldPassword = ref('')
const newPassword = ref('')
const confirmPassword = ref('')
const message = ref('')
const isLoading = ref(false)
const messageClass = ref('')

const changePassword = async () => {
  if (newPassword.value !== confirmPassword.value) {
    message.value = '新密码与确认密码不匹配'
    messageClass.value = 'bg-red-100 text-red-700'
    return
  }

  isLoading.value = true
  message.value = ''

  try {
    const result = await changePasswordApi(oldPassword.value, newPassword.value)
    
    if (result.success) {
      message.value = result.message
      messageClass.value = 'bg-green-100 text-green-700'
      
      // Clear form
      oldPassword.value = ''
      newPassword.value = ''
      confirmPassword.value = ''
    } else {
      message.value = result.message
      messageClass.value = 'bg-red-100 text-red-700'
    }
  } catch (error) {
    message.value = '修改密码失败'
    messageClass.value = 'bg-red-100 text-red-700'
  } finally {
    isLoading.value = false
  }
}
</script> 