<script setup>
import CountTodos from './CountTodos.vue'
import { onMounted, ref } from 'vue'

const props = defineProps({
  todos: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['delete-todo', 'update:todo'])

const editText = ref('')
const editModeStatus = ref({}) // 用 id 紀錄該 todo 是否在編輯狀態

const editTodo = todo => {
  // change Edit mode
  editModeStatus.value[todo.id] = !editModeStatus.value[todo.id]
  editText.value = todo.text
}

const saveTodo = todo => {
  // change Edit mode
  editModeStatus.value[todo.id] = !editModeStatus.value[todo.id]

  emit('update:todo', {
    ...todo,
    text: editText.value,
  })
}

const toggleCompleted = todo => {
  emit('update:todo', {
    ...todo,
    isCompleted: !todo.todo,
  })
}

// 刪除
const handleDelete = id => {
  const isConfirmed = confirm('確定要刪除嗎？')
  if (isConfirmed) {
    emit('delete-todo', id)
  }
}

onMounted(() => {
  // 初始化 editModeStatus（ todo 的編輯狀態）
  if (props.todos.length > 0) {
    props.todos.forEach(todo => {
      if (!(todo.id in editModeStatus.value)) {
        editModeStatus.value[todo.id] = false
      }
    })
  }
})
</script>

<template>
  <div style="padding: 10px">
    <ul style="padding-left: 0px">
      <li v-for="todo in props.todos" :key="todo.id">
        <input
          :id="todo.id"
          type="checkbox"
          :checked="todo.isCompleted"
          @change="toggleCompleted(todo)"
        />
        <label
          v-if="!editModeStatus[todo.id]"
          :class="{ completed: todo.isCompleted }"
          :for="todo.id"
          >{{ todo.text }}</label
        >
        <input v-if="editModeStatus[todo.id]" type="text" v-model="editText" />

        <button
          v-if="!editModeStatus[todo.id]"
          type="button"
          @click="editTodo(todo)"
        >
          編輯
        </button>
        <button
          v-if="editModeStatus[todo.id]"
          type="button"
          @click="saveTodo(todo)"
        >
          完成
        </button>
        <button type="button" @click="handleDelete(todo.id)">刪除</button>
      </li>
    </ul>
    <CountTodos />
  </div>
</template>

<style scoped>
.completed {
  text-decoration: line-through;
}
</style>
