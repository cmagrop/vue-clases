<template>
    <input type="text" v-model="terminoBusqueda" placeholder="Buscar por nombre o categoria">

    <ProductoCard v-for="p in productosFiltrados" :key="p.id" :producto="p">
        <template v-slot:etiqueta v-if="p.oferta">
          <span>OFERTA</span>
        </template>
    </ProductoCard>
</template>

<script setup>
    import {ref, computed} from 'vue';
    import { useStore } from 'vuex';
    import ProductoCard from '../components/ProductoCard.vue'
    const store = useStore();
    const terminoBusqueda = ref('');
 
    
    const productosFiltrados = computed(
        ()=>{
          //Queremos a los valores directamente dentro de la función 
          const filtro = store.getters['filtrarCatalogo'];
          //Si el buscador esta vacío, que muestre todos los productos
          console.log("Termino encontrado "+terminoBusqueda.value);
          
          if(!terminoBusqueda.value.trim())
        {
          return store.state.productos;
        }
        if(typeof filtro==='function')
        {
          console.log("Entrando el filtro")
          return filtro(terminoBusqueda.value);
          
        }
        return store.state.productos;

        }
    );
    
   
   
  
</script>