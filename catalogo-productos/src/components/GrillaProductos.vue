<template>
<!--
g-4-> gap:1.5rem;
-->
    <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-4"
        v-for="producto in productos" 
        :key="producto.categoria+'-'+producto.id"
        >
        <!--
            Las siguientes declaraciones corresponde a atributos
            definidos dentro de los props de ProductoCard.vue y son 
            los siguientes (se escriben antoponiendo :):
            :nombre
            :precio
            :imagen-->
        <ProductoCard
            :nombre = "producto.nombre"
            :precio = "producto.precio"
            :imagen = "producto.imagen"
            :descripcion = "producto.descripcion"
        
        >
        <!-- si producto.esNuevo da true se muestra la informacion
         py-2 -> padding-top: 0.5rem; padding-bottom: 0.5rem;
         lo que está dentro de las etiquetas de ProductoCard
         se agregará en el slot declarado en ProductoCard.vue-->
        <span v-if="producto.esNuevo" class="badge bg-success w-100 py-2">
            ¡Nuevo!
        </span>
        <button v-else class="btn btn-outline-primary w-100">
            Agregar al carrito</button>
        </ProductoCard>


        </div>

    </div>

</template>

<script setup>
import ProductoCard from './ProductoCard.vue';
defineProps({
    productos: Array //se declara un arreglo
});
</script>