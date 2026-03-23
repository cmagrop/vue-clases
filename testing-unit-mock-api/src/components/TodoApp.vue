<template>
  <div>
    <h1>{{ title }}</h1>
    <input v-model="newTodo" placeholder="Nueva tarea" data-testid="todo-input" />
    <button @click="handleAddTodo" data-testid="todo-button">Agregar</button>
    
    <ul v-if="todos.length"> <!-- todos.length es mayor a 0 -->
      <li v-for="(todo, index) in todos" :key="index">{{ todo }}</li>
    </ul>
  </div>
</template>

<script>
import { api } from '@/services/api';

export default {
  props: {
    title: { type: String, default: 'Lista' }
  },
  data() {
    return {
      newTodo: '',
      todos: []
    }
  },
  methods: {
    handleAddTodo() {
      if (this.newTodo.trim()) {
        const success = api.saveTodo(this.newTodo);
        if (success)  //success es true
        {
          this.todos.push(this.newTodo);
          //emit emite al padre el evento
          this.$emit('added', this.newTodo);//evento se llama added
          this.newTodo = ''; //limpia en v-model del input
        }
      }
    }
  }
}
</script>