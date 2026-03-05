<template>
    <div>
        <button @click="eliminar">X</button>
        <h3>{{ producto.nombre }}</h3>
        <p>Precio: ${{ producto.precio }}</p>
        <p>Categoria:{{ producto.categoria }}</p>
        <p v-if="producto.stock>0">Stock: {{producto.stock}}</p>
        <p v-else>Agotado</p>
    </div>
    <div>
        <slot name="etiqueta"></slot>
    </div>

</template>

<script setup>

import { useStore } from 'vuex';
import { defineProps } from 'vue';
const props = defineProps(['producto']);
const store = useStore();

//crear eliminar
const eliminar = ()=>{
    if(confirm(`¿Eliminar ${props.producto.nombre}`)){
        store.dispatch('borrarProducto',props.producto.id)
    }
}

</script>