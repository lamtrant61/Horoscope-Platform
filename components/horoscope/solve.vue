<template>
  <div style="white-space: pre-wrap; text-indent: 2em">
    {{ formatted }}
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
interface Props {
  solveData: string
}
// defineProps<Props>()
const props = defineProps<Props>()

// Xử lý: chèn indent (khoảng trắng) sau mỗi newline
const formatted = computed(() => {
  const indent = '\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0' // 6 khoảng trắng không phá vỡ (non-breaking space)
  return props.solveData.replace(/\n(\S)/g, `\n${indent}$1`)
})
</script>
