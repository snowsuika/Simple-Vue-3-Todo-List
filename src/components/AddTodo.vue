<template>
  <form id="form" @submit.prevent="onSubmit">
    <div>
      <input type="text" v-model="text" placeholder="todo text.." />
      <button type="submit">送出</button>
    </div>
  </form>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['addTodo'])
const text = ref('')

const onSubmit = () => {
  emit('addTodo', {
    id: crypto.randomUUID(),
    text: text.value,
    isCompleted: false,
  })

  // init
  text.value = ''
}
</script>
