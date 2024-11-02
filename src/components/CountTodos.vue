<script setup>
import { inject } from 'vue'
const { todoStatusCount } = inject('todoStatusCount')
</script>

<template>
  <div>已完成 {{ todoStatusCount.done }} 個</div>
</template>
