import { ref, computed } from 'vue'

export function useTodos() {
  const todos = ref(loadTodos()) // 從 localStorage 載入
  const filterType = ref('all')

  // 資料來源
  function loadTodos() {
    try {
      const localStorageTodos = localStorage.getItem('todos')
      return localStorageTodos ? JSON.parse(localStorageTodos) : []
    } catch (error) {
      console.error(error)
      return []
    }
  }

  // 儲存資料
  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos.value))
  }

  // 過濾邏輯
  const filteredTodos = computed(() => {
    switch (filterType.value) {
      case 'todo':
        return todos.value.filter(todo => !todo.isCompleted)
      case 'done':
        return todos.value.filter(todo => todo.isCompleted)
      default:
        return todos.value
    }
  })
  function setFilter(newFilter) {
    filterType.value = newFilter
  }

  // 統計邏輯
  const todoStatusCount = computed(() => ({
    done: todos.value.filter(todo => todo.isCompleted).length,
    pending: todos.value.filter(todo => !todo.isCompleted).length,
    total: todos.value.length,
  }))

  // CUD 操作
  function addTodo(todoData) {
    todos.value.push({
      id: crypto.randomUUID(),
      text: todoData.text,
      isCompleted: false,
    })
    saveTodos()
  }

  function updateTodo(updatedTodo) {
    todos.value = todos.value.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo,
    )
    saveTodos()
  }

  function deleteTodo(id) {
    todos.value = todos.value.filter(todo => todo.id !== id)
    saveTodos()
  }

  return {
    // 狀態
    filteredTodos,
    filterType,
    todoStatusCount,

    // 方法
    addTodo,
    deleteTodo,
    updateTodo,
    setFilter,
  }
}
