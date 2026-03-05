<template>
  <div class="container mt-5" style="max-width: 500px;">
    <h2 class="text-center mb-4">Mis Tareas</h2>
    <div class="input-group mb-2">
      <input type="text"
      v-model="tareaNueva"
      class="form-control"
      placeholder="Escribe tu tarea..."
      @keydown.enter="agregarTarea"
      >
      <button class="btn bnt-primary" @click="agregarTarea">
        +
      </button>

    </div>
    <div v-if="error" class="alert alert-warning py-1 small">
      {{ error }}
    </div>
    <ul class="list-group mt-4">
      <!--:nombre hace referencia al prop que declaramos en TareaItem
      @eliminar-tarea va a llamar al emit declarado en TareaItem-->
      <TareaItem 
      v-for="(tarea,index) in tareas"
      :key="index"
      :nombre="tarea"
      @eliminar-tarea="eliminarTarea(index)"  
      />
    </ul>
    <p v-if="tareas.length==0" class="text-muted text-center mt-3">
      No hay tareas pendientes</p>

  </div>

</template>

<script setup>
import { ref } from 'vue';
import TareaItem from './components/TareaItem.vue';
//Estado inicial 
const tareaNueva =ref('');
const tareas = ref([]); //arreglo vaçio
const error = ref(''); //validará el campo del formulario
//función agregar tarea
const agregarTarea = 
()=>{
  const valor = tareaNueva.value.trim();
  if(!valor) //si valor es vacío -> si es falso
  {
    error.value="El campo no puede estar vacío";
    return;
    
  }
  if(tareas.value.includes(valor)){
    error.value="Esta tarea ya existe en la lista";
    return;
  }
  //entonces si no entra a ninguno de los casos anteriores podremos agregar tarea
  tareas.value.push(valor);
  tareaNueva.value=''; //resetar la variable
  error.value='';
};

//eliminar tarea
const eliminarTarea =
(index)=>{
  tareas.value.splice(index,1);//splice borrará un único elemento con un index especifico
};



</script>
