<script setup>
import { ref } from 'vue'
const emit = defineEmits(['update:filter'])

const FILTER_TYPES = {
  ALL: 'all',
  TODO: 'todo',
  DONE: 'done',
}

const filterOptions = [
  { type: FILTER_TYPES.ALL, label: 'ALL' },
  { type: FILTER_TYPES.TODO, label: 'Todo' },
  { type: FILTER_TYPES.DONE, label: 'Done' },
]

const currentFilter = ref(FILTER_TYPES.ALL)

const isActive = filterType => currentFilter.value === filterType

const setFilter = filterType => {
  currentFilter.value = filterType
  emit('update:filter', filterType)
}
</script>
<template>
  <div class="filter-container">
    <template v-for="(option, index) in filterOptions" :key="option.type">
      <a
        href="javascript:void(0)"
        :class="{ active: isActive(option.type) }"
        @click="setFilter(option.type)"
      >
        {{ option.label }}
      </a>
      <span v-if="index < filterOptions.length - 1"> | </span>
    </template>
  </div>
</template>

<style scoped>
a {
  color: gray;
}
.active {
  color: #42b983;
  font-weight: bold;
}
</style>
