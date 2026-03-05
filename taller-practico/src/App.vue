<template>
  <nav>
    <router-link to="/">Catálogo</router-link> |
    <router-link to="/agregar">Nuevo Producto</router-link>
  </nav>
  <router-view v-slot="{Component}">
    <keep-alive>
      <component :is="Component"></component>
    </keep-alive>
  </router-view>

</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
