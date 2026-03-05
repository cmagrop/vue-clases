<template>
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <!-- nombre es la declaración del prop
         @click.once permitirá que el botón se clickee solo 1 vez
         $emit('eliminar-tarea') mandará un evento al padre diciendole que
         elimina la tarea-->
        {{ nombre }} 
        <button class="btn btn-danger btn-sm" @click="$emit('eliminar-tarea')">
            -
        </button>

    </li>

</template>

<script setup>
import { defineProps,defineEmits } from 'vue';
/*
props: son la forma que un componente padre le pasa datos a un componente
(comunicación hacia abajo).
emits: son la forma que un componente le avisa al padre que algo sucedió
(comunicación hacia arriba).

*/

defineProps(['nombre']);//componente espera recibir una propiedad llamada nombre del padre
defineEmits(['eliminar-tarea']);//disparar un evento personalizado eliminar-tarea al padre

</script>