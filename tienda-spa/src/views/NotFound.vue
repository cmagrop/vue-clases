<template>
  <div class="container text-center vh-100 
  d-flex flex-column justify-content-center align-items-center">
  <!--
  display-1-> 5rem -> 80px en una pantalla de laptop normal
  -->
  <h1 class="display-1 fw-bold text-danger">404</h1>
  <h2 class="mb-4">¡Página no encontrada!</h2>
  <!--lead: permite aumentar el tamaño de una etiqueta(parrafo) levemente-->
  <p class="lead mb-5">Lo sentimos, estás tratando de acceder a 
    una ruta inválida o que ha sido modificada
  </p>
  <router-link to="/" class="btn btn-primary btn-lg" >
    Volver al inicio
  </router-link>

  </div>
</template>