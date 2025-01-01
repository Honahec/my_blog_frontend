<script setup>
import { ref, watch } from 'vue'
import { useApi } from '../composables/useApi'

const props = defineProps({
  initialSearch: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['search'])

const { api } = useApi()
const searchQuery = ref(props.initialSearch)
const selectedTags = ref([])
const startDate = ref('')
const endDate = ref('')
const availableTags = ref([])
const showFilters = ref(false)

// 获取所有可用标签
const fetchTags = async () => {
  try {
    const response = await api.get('/posts/tags/')
    availableTags.value = response.data
  } catch (error) {
    console.error('Failed to fetch tags:', error)
  }
}

// 监听搜索条件变化
watch([searchQuery, selectedTags, startDate, endDate], () => {
  const params = new URLSearchParams()
  
  if (searchQuery.value) {
    params.append('search', searchQuery.value)
  }
  
  if (selectedTags.value.length) {
    params.append('tags', selectedTags.value.join(','))
  }
  
  if (startDate.value) {
    params.append('start_date', startDate.value)
  }
  
  if (endDate.value) {
    params.append('end_date', endDate.value)
  }
  
  emit('search', params.toString())
})

// 重置所有筛选条件
const resetFilters = () => {
  searchQuery.value = ''
  selectedTags.value = []
  startDate.value = ''
  endDate.value = ''
  showFilters.value = false
}

// 组件挂载时获取标签
fetchTags()
</script>

<template>
  <div class="space-y-4">
    <!-- 搜索框 -->
    <div class="flex gap-2">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索文章..."
        class="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
      <button
        @click="showFilters = !showFilters"
        class="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
      >
        筛选
      </button>
    </div>

    <!-- 筛选面板 -->
    <div v-if="showFilters" class="p-4 bg-white border border-gray-200 rounded-md shadow-sm space-y-4">
      <!-- 标签选择 -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">标签</label>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tag in availableTags"
            :key="tag"
            @click="selectedTags.includes(tag) ? selectedTags = selectedTags.filter(t => t !== tag) : selectedTags.push(tag)"
            :class="[
              'px-3 py-1 text-sm rounded-full',
              selectedTags.includes(tag)
                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            ]"
          >
            {{ tag }}
          </button>
        </div>
      </div>

      <!-- 日期范围 -->
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">开始日期</label>
          <input
            v-model="startDate"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">结束日期</label>
          <input
            v-model="endDate"
            type="date"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
        </div>
      </div>

      <!-- 重置按钮 -->
      <div class="flex justify-end">
        <button
          @click="resetFilters"
          class="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          重置筛选
        </button>
      </div>
    </div>
  </div>
</template> 