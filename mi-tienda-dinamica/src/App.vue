<template>
  <!-- min-vh-100 : ocupar minimo el 100% de alto del viewport
       pb-5: padding  inferior de -> padding-bottom: 3rem aproxidamente 48px -->
  <div class="bg-light min-vh-100 pb-5">
    <!-- navbar-dark establecerá colores claros para las secciones del navbar
     bg-dark establecerá un color gris casi negro
     mb-4: margin-bottom: 1.5rem -->
    <nav class="navbar navbar-dark bg-dark mb-4 shadow">
      <!-- container: centrar y limitar el ancho de la barra manteniendo diseño responsivo
       badge: etiqueta
       rounded-pill-> redondeado de los bordes (border-radious) para que quede como 
       un pill(pildora) 
       bg-primary : color azul 
       fs-6 -> font-size: 1rem-->
      <div class="container">
        <span class="navbar-brand mb-0 h1">🚀 Mi tienda dinámica</span>
        <span class="badge rounded-pill bg-primary fs-6">🛒 Carrito: {{ carrito }}</span>

      </div>

    </nav>

    <!--Campo de suscripción en card
    mb-5 : 3rem
    mb-3: 1rem-->
    <div class="container">
      <div class="card mb-5 border-0 shadow-sm">
        <div class="card-body bg-white rounded ">
          <h5 class="card-title mb-3 text-secondary">Suscribirse a novedades</h5>
          <!-- 
          @submit.prevent="procesarSuscripcion"
          @submit-prevent es una directiva de vue que evita el envío por defecto
          de un mensaje. Luego de realizar la validación una vez que se envía el formulario
          ejecutará la función procesarSuscripcion
          row g-3: establecerá un sistema de grillas con distancia de 1 rem entre columnas
          -->
          <form @submit.prevent="procesarSuscripcion" class="row g-3">
            <div class="col-md-8">
              <input  v-model="email" type="email" class="form-control" 
              placeholder="nombre@correo.com" required>
            </div>
            <div class="col-md-4">
              <button type="submit" class="btn btn-primary w-100 ">Suscribirme</button>
            </div>

          </form>
          <!--
          v-if="suscrito"-> si la variable suscrito es verdadera
          entonces mostrará el párrafo
          -->
          <p v-if="suscrito">¡Gracias! Te contactaremos a: {{ email }}</p>

        </div>

      </div>

      <!--cierre del card-->
      <!--mostrar productos-->
      <div class="row">
        <div v-for="producto in productos" :key="producto.id"  class="col md-4">
          <div class="card h-100 border-0 shadow-sm card-hover ">

            <div class="card-body text-center">
              <h4 class="card-title text-dark">{{ producto.nombre }}</h4>
              <p class="text-primary fw-bold fs-5">${{ producto.precio }}</p>
              <!--my-3-> margen superior e inferior de 1rem
              margin-top: 1rem
              margin-bottom: 1rem
              -->
              <div class="my-3">
                <!--px-3-> asignar un padding horizontal (x)
                de 1 rem
                padding-left: 1rem;
                padding-right: 1rem;
                -->
                <span v-if="producto.stock>0" class="badge bg-success-subtle text-success
                 border border-success px-3">
                  Disponible: {{ producto.stock }} u.
                </span>
                <span v-else class="badge bg-danger-subtle 
                text-danger border border-danger px-3">
                  Agotado
                </span>

              </div>
              <!--implementar la compra
              d-grid-> display:grid
              gap-2:espacio 0.5rem
              mt-4-> margin-top: 1.5rem-->
              <div class="d-grid gap-2 mt-4">
                <button @click="comprar(producto)" 
                class="btn btn-dark" :disabled="producto.stock===0">
                {{ producto.stock>0?'Agregar al carrito':'Sin stock' }}

                </button>

                <button @click.once="producto.mostrarDetalle=true" 
                class="btn btn-outline-secondary btn-sm">
                  <!--muestra informacion si mostrarDetalle
                  es true(verdadero)-->
                  {{ producto.mostrarDetalle? 'Detalles desbloqueados':'Ver ficha técnica' }}

                </button>

              </div>
              <!--v-show validará si producto.mostrarDetalle es verdadera
              y mostrará el detalle del producto
              v-show es una propiedad que no elimina el elemento
              del árbol DOM, solo lo oculta. A diferencia del v-if 
              que si elimina el elemento del árbol DOM 
              mt-3: 1 rem
              -->
              <div v-show="producto.mostrarDetalle"
              class="mt-3 p-3 bg-light rounded text-start small border">
              <h4>Ficha Técnica</h4>
              <p>{{ producto.detalle }}</p>

              </div>

              </div>


            </div>

          </div>

        </div>
      </div>


      <!-- finalizar mostrar productos-->



    </div>

    
  
</template>



<script setup>
/*
<script setup> equivale a decir
export default{
  setup(){
    //caracteristicas
  }
}

*/
import {ref} from 'vue'
//arreglo de objetos con los productos
const productos = ref(

[
  {
    id:101,
    nombre:'Auriculares Pro',
    precio:85000,
    stock:5,
    mostrarDetalle:false,//por defecto no muestra detalles
    detalle: 'Cancelación de ruido activa y 20 horas de duración'
  },
  {
    id:102,
    nombre:'Teclado mecánico',
    precio: 24000,
    stock:0,
    mostrarDetalle:false,
    detalle:'Tiene iluminación de las teclas'
  },
  {
    id:103,
    nombre: 'Mouse óptico',
    precio: 14000,
    stock: 12,
    mostrarDetalle: false,
    detalle:'botones programables'
  }

]
)


//variables de estado
const carrito = ref(0);
const email = ref('');
const suscrito= ref(false); //estado inicial false->usuario no suscrito

//declaracion de funciones
const comprar =
(p)=>{
  if(p.stock>0)
  {
    p.stock--; //disminuir el stock de un producto
    carrito.value++; //sumar un producto al carrito de compras
    
  }
}

const procesarSuscripcion=
()=>{
  suscrito.value=true; //correo suscrito
}




</script>

<style>

</style>
