<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark mb-4">
    <div class="container">
      <router-link class="navbar-brand" to="/">
        Tienda
      </router-link>
      <div class="navbar-nav">
        <router-link class="nav-link" to="/">
          Inicio
        </router-link>
        
        <router-link class="nav-link" to="/productos">
          Productos
        </router-link>
      </div>
      
    </div>
    
  </nav>
  <router-view/>
</template>


