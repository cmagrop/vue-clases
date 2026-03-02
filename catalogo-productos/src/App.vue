<template>
  <div class="container py-5">
    <div class="d-flex justify-content-between 
    align-items-center mb-4 pb-3 border-bottom">
    <h1 class="h3 mb-0 text-dark">Catálogo de Productos</h1>
    <!--:class se llaman clases dinámicas y permite usar operadores ternarios
    dentro de Vue. @click con esa condición nos está diciendo que cuando
    se haga click se asigne GrillaProductos a la variable reactiva vistaActual-->
    <div class="btn-group">
      <button class="btn" :class="vistaActual===GrillaProductos?'btn-primary':
      'btn-outline-primary'" @click="vistaActual=GrillaProductos">
        Vista Grilla
      </button>
      <button class="btn" :class="vistaActual===DetalleProducto?'btn-primary':
      'btn-outline-primary'" @click="vistaActual=DetalleProducto">
        Vista Detalle
      </button>

    </div>


    </div>
    <div class="bg-light p-4 rounded border">
      <!--keep-alive: es un componente de Vue que congela el estado de los
      componentes cuando se dejan de ver sin destruirlos
      component: es un marcador de posicion que no sabe lo que tiene que hacer hasta
      que le decimos-->
      <keep-alive>

        <component :is="vistaActual" :productos="listaProductos"></component>
    
      </keep-alive>
    </div>

  </div>


</template>

<script setup>
/*
ref-> hace que sea reactivo cualquier elemento
shallowRef->reactividad poco profunda->

ref por su parte tanto si cambio completamente un objeto como si lo
cambio de forma parcial disparará una actualización reactiva. En cambio
shallowRef solo disparará una actualización cuando se realice la modificación
completa de un objeto

Otra diferencia es el rendimiento; ref por su parte tiene un rendimiento
mucho mas lento que shallowRef
*/
import { ref,shallowRef } from "vue";
import GrillaProductos from "./components/GrillaProductos.vue";
import DetalleProducto from "./components/DetalleProducto.vue";
const vistaActual = shallowRef(GrillaProductos); 

const listaProductos = ref([
  {
    id: '101',
    categoria: 'tecnologia',
    nombre: 'Smartwatch Serie X',
    precio: 199.50,
    imagen: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&q=80',
    descripcion: 'Reloj inteligente con monitor de ritmo cardíaco y <strong>pantalla OLED</strong>.',
    esNuevo: true,
    descuento: null
  },
  {
    id: '102',
    categoria: 'hogar',
    nombre: 'Lámpara de Escritorio LED',
    precio: 35.00,
    imagen: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?w=400&q=80',
    descripcion: 'Lámpara con <i>3 niveles de brillo</i> y puerto USB para carga.',
    esNuevo: false,
    descuento: '20%'
  },
  {
    id: '103',
    categoria: 'tecnologia',
    nombre: 'Teclado Mecánico RGB',
    precio: 85.99,
    imagen: 'https://images.unsplash.com/photo-1595225476474-87563907a212?w=400&q=80',
    descripcion: 'Switches azules táctiles para la <b>mejor experiencia de escritura</b>.',
    esNuevo: true,
    descuento: null
  }
]);


</script>


