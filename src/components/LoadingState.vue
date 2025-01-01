<script setup>
defineProps({
  size: {
    type: String,
    default: 'md', // sm, md, lg
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  }
})
</script>

<template>
  <div class="flex justify-center py-8">
    <div 
      class="animate-spin rounded-full border-b-2 border-gray-900"
      :class="{
        'h-8 w-8': size === 'sm',
        'h-12 w-12': size === 'md',
        'h-16 w-16': size === 'lg'
      }"
    ></div>
  </div>
</template> 