<script setup>
import TodoList from './components/TodoList.vue'
import AddTodo from './components/AddTodo.vue'
import FilterTodos from './components/FilterTodos.vue'
import { useTodos } from './composables/useTodos'
import { provide } from 'vue'

import { useThemeStore } from './stores/theme'
import ThemeSwitcher from './components/ThemeSwitcher.vue'

// 初始化主題
const theme = useThemeStore()
document.documentElement.classList.toggle('dark', theme.isDark)

const {
  //  data
  filteredTodos,

  // computed
  todoStatusCount,

  // methdos
  addTodo,
  deleteTodo,
  updateTodo,
  setFilter,
} = useTodos()

// 提供資料給子元件
provide('todoStatusCount', {
  todoStatusCount,
})
</script>

<template>
  <div>
    <ThemeSwitcher />

    <FilterTodos @update:filter="setFilter" />
    <AddTodo @add-todo="addTodo" />
    <TodoList
      :todos="filteredTodos"
      @delete-todo="deleteTodo"
      @update:todo="updateTodo"
    />
  </div>
</template>
