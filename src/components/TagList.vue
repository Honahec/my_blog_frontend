<script setup>
defineProps({
  tags: {
    type: Array,
    required: true
  },
  size: {
    type: String,
    default: 'sm', // sm, md
    validator: (value) => ['sm', 'md'].includes(value)
  }
})
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <span
      v-for="tag in tags"
      :key="tag"
      :class="[
        'px-2 py-1 rounded-full',
        size === 'sm' ? 'text-xs' : 'text-sm',
        'bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors duration-200'
      ]"
    >
      {{ tag.trim() }}
    </span>
  </div>
</template> 