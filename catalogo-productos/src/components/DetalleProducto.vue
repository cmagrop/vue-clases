<template>
    <div class="row g-4">
        <div class="col-12"
        v-for="producto in productos"
         :key="producto.categoria + '-'+ producto.id">
         <ProductoCard
         :nombre="producto.nombre"
         :precio="producto.precio"
         :imagen="producto.imagen"
         :descripcion="producto.descripcion"
         >
         <!--v-if esta validando si el producto tiene descuento o no
         si tien descuento se llenará el slot
         role="alert" 
         role="alert" indicará a personas que usen lectores especiales
         con discapacidad visual que este contenido es importante-->
         <div v-if="producto.descuento" 
         class="alert alert-danger m-0 p-2 text-center" role="alert">
         ¡Aprovecha un <strong>{{ producto.descuento }}</strong> de descuento

         </div>

         </ProductoCard>
        </div>

    </div>

</template>

<script setup>

import ProductoCard from './ProductoCard.vue';

defineProps({
    productos:Array
});

</script>