<template>
  <div class="todo-app">
    <h1>Lista de Tareas</h1>
    <div class="input-group">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask"
        placeholder="Añadir nueva tarea"
        data-test="todo-input"
      />
      <button @click="addTask" data-test="add-button">Agregar</button>
    </div>

    <ul v-if="tasks.length > 0">
      <li v-for="(task, index) in tasks" :key="index" data-test="todo-item">
        {{ task }}
      </li>
    </ul>
    <p v-else data-test="empty-msg">No hay tareas pendientes.</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const newTask = ref('')
const tasks = ref([])

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push(newTask.value.trim())
    newTask.value = ''
  }
}
</script>