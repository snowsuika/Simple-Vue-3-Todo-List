<script setup>
import { inject } from 'vue'
const { todoStatusCount } = inject('todoStatusCount')
</script>

<template>
  <div style="padding: 5px; margin-top: 10px">
    已完成 {{ todoStatusCount.done }} 個
  </div>
</template>
