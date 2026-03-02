<script setup>
/* recibir parámetros desde el componente padre que en este caso
es App.vue; para eso usaremos props */
const props = defineProps(
    {
        texto:String //texto será un prop de tipo cadena de texto
    }
)

/*
Definir un evento personalzado que se enviará al padre 
Se define la emisión de un evento con un identificador, en nuestro caso
será incrementar
*/

const emit = defineEmits(['incrementar']);

const manejarClick =
()=>{
    emit('incrementar'); //el clickear boton, emitirá el evento incrementar
};


</script>

<template>
    <button @click="manejarClick" class="btn-personalizado">
        {{ texto }}
    </button>


</template>

<style scoped>
.btn-personalizado{
    padding: 10px 20px;
    background-color: chartreuse;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 0 2px 5px black;
}

.btn-personalizado:hover{
    background-color: white;
    color:chartreuse;
}

</style>