<script setup>
import TodoList from './components/TodoList.vue'
import AddTodo from './components/AddTodo.vue'
import FilterTodos from './components/FilterTodos.vue'

import { ref, computed, provide } from 'vue'

const loadTodos = () => {
  try {
    const localStorageTodos = localStorage.getItem('todos')
    return localStorageTodos ? JSON.parse(localStorageTodos) : []
  } catch (error) {
    console.error(error)
    return []
  }
}
const todos = ref(loadTodos())
const filter = ref('all') // 預設顯示全部

const filteredTodos = computed(() => {
  switch (filter.value) {
    case 'todo':
      return todos.value.filter(todo => !todo.isCompleted)
    case 'done':
      return todos.value.filter(todo => todo.isCompleted)
    default:
      return todos.value
  }
})

const handleFilter = filterType => {
  filter.value = filterType
}

const saveToStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todos.value))
}

const handleAddTodo = todo => {
  todos.value.push(todo)
  saveToStorage()
}
const handleDeleteTodo = id => {
  todos.value = todos.value.filter(todo => todo.id !== id)
  saveToStorage()
}
const handleUpdateTodo = updatedTodo => {
  todos.value = todos.value.map(todo =>
    todo.id === updatedTodo.id ? updatedTodo : todo,
  )
  saveToStorage()
}

const todoStatusCount = computed(() => {
  return {
    done: todos.value.filter(todo => todo.isCompleted).length,
    pending: todos.value.filter(todo => !todo.isCompleted).length,
  }
})
provide('todoStatusCount', {
  todoStatusCount,
})
</script>

<template>
  <div>
    <TestComponent></TestComponent>
    <FilterTodos @update:filter="handleFilter" />
    <AddTodo @add-todo="handleAddTodo" />

    <TodoList
      @update:todo="handleUpdateTodo"
      @delete-todo="handleDeleteTodo"
      :todos="filteredTodos"
    />
  </div>
</template>
