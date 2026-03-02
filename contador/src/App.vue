<script setup>
import { ref } from "vue";
import  BotonContador from "./components/BotonContador.vue";

//variables reactivas
const titulo = ref('Contador Vue');
const contador = ref(0);

//método aumentarContador()

const aumentarContador =
()=>{
  contador.value++; //aumentar el contador en 1
}


</script>

<template>
  <div class="container">
    <h1>{{ titulo }}</h1>
    <div class="card">
      <p>El valor del contador es <strong>{{ contador }}</strong></p>
      <BotonContador
      texto="sumar +1"
      @incrementar="aumentarContador"
      />
    </div>
  </div>
</template>
<!-- style scoped: que el estilo se aplicará solo al componente vue
 que está siendo efectado
 
 style: significa que afectará a todos los componentes de forma global-->
<style>
.container{
  font-family: sans-serif,Arial;
  text-align: center;
  margin-top: 50px;
}

.card{
  border: 1px solid #03610f;
  padding: 20px;
  display: inline-block;
  border-radius: 10px;

}

</style>
