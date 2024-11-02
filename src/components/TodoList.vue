<script setup>
import { ref } from 'vue'
import CountTodos from './CountTodos.vue'

defineProps({
  todos: {
    type: Array,
    required: true,
  },
})
const emit = defineEmits(['delete-todo', 'update:todo'])

// UI 狀態
const editMode = ref({})
const editText = ref('')

// UI 處理方法
const startEdit = todo => {
  editMode.value[todo.id] = true
  editText.value = todo.text
}

const saveEdit = todo => {
  if (!editText.value.trim()) return

  emit('update:todo', {
    ...todo,
    text: editText.value,
  })
  editMode.value[todo.id] = false
}

const cancelEdit = todoId => {
  editMode.value[todoId] = false
  editText.value = ''
}

const toggleCompleted = todo => {
  emit('update:todo', {
    ...todo,
    isCompleted: !todo.isCompleted,
  })
}

const handleDelete = id => {
  const isConfirmed = confirm('確定要刪除嗎？')
  if (isConfirmed) {
    emit('delete-todo', id)
  }
}
</script>

<template>
  <div style="padding: 10px">
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <!-- 一般狀態 -->
        <div v-if="!editMode[todo.id]">
          <div>
            <input
              type="checkbox"
              :checked="todo.isCompleted"
              @change="toggleCompleted(todo)"
            />
            <span :class="{ completed: todo.isCompleted }">
              {{ todo.text }}
            </span>
            <button type="button" @click="startEdit(todo)">編輯</button>
            <button type="button" @click="handleDelete(todo.id)">刪除</button>
          </div>
        </div>

        <!-- 編輯狀態 -->
        <div v-else>
          <input
            v-model="editText"
            @keyup.enter="saveEdit(todo)"
            @keyup.esc="cancelEdit(todo.id)"
            class="edit-input"
          />
          <button type="button" @click="saveEdit(todo)">儲存</button>
          <button type="button" @click="cancelEdit(todo.id)">取消</button>
        </div>
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
