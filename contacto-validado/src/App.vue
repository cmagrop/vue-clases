<template>
  <main id="app-container">
    <h1>Formulario de Contacto</h1>
    <ContactoForm
    :estaCargando="loading"
    @enviar="manejarEventoHijo"
    />
    <div v-if="feedback" :class="['feedback-msg',tipoFeedback]">
      <p>{{ feedback }}</p>

    </div>
  </main>


</template>

<script setup>
import { ref } from 'vue';
import ContactoForm from './components/ContactoForm.vue';
//Estados de control de la interfaz
const loading = ref(false);
const feedback = ref('');
const tipoFeedback = ref('');
/*
Manejar los datos obtenidos desde ContactoForm.vue

*/

const manejarEventoHijo =
(payload)=>{
  loading.value=true;
  feedback.value=`Enviando solicitud de ${payload.tipoCliente}...`;
  tipoFeedback.value='info';
  //Simulación de envío a la API
  setTimeout(
    ()=>{
      loading.value=false; //restituir el valor del loading por defecto
      //confirmación de correo enviado
      feedback.value=`¡Correo enviado exitosamente!. Hemos recibido 
      exitosamente tu mensaje sobre ${payload.asunto}`;
      tipoFeedback.value='success'; //clase de css

    },2000
  )




}

</script>

<style scoped>
#app-container{
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 600px;
  margin: 40px auto; /*40px margen superior e inferior, auto laterales */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0, 0.1);
  background-color: #f9f9f9;
}
h1{
  color: #2c3e50;
  text-align: center;
  margin-bottom: 30px;
}

/* Clases para los mensajes de feedback */
.feedback-msg{
  margin-top: 20px;
  padding: 15px;
  border-radius: 4px;
  text-align: center;
  font-weight:bold;
}

.success{
  color: #155724;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.info{
  color:#0c5460;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
}


</style>