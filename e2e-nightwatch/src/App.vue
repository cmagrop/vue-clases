<template>
  <div id="app">
    <h1>Gestor de Tareas</h1>
    <input v-model="nuevaTarea" data-test="input-tarea" placeholder="Nueva tarea...">
    <button @click="agregar" data-test="boton-agregar">Agregar</button>
    
    <ul data-test="lista-tareas">
      <li v-for="(tarea, index) in tareas" :key="index" :class="{ completada: tarea.done }">
        {{ tarea.texto }}
        <input type="checkbox" v-model="tarea.done" data-test="check-tarea">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nuevaTarea: '', // Importante: debe empezar vacío
      tareas: []      // La lista empieza vacía, por eso el test espera al clic
    }
  },
  methods: {
    agregar() {
      // Validamos que no esté vacío
      if (this.nuevaTarea.trim() !== '') {
        this.tareas.push({
          texto: this.nuevaTarea,
          done: false
        });
        this.nuevaTarea = ''; // Limpiamos el input tras agregar
      }
    }
  }
}
</script>

<style>
.completada {
  text-decoration: line-through;
  color: gray;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 20px;
}
</style>