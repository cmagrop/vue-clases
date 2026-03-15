<template>
    <div class="contacto-form">
        <!--
        @submit-> estará escuchando que alguien apriete el boton enviar
        prevent es modificador que evita que la pagina se autorecargue
        novalidate elimina las validaciones por defecto de html
        -->
        <form @submit.prevent="enviarFormulario" novalidate>
            <div class="form-group">
                <label for="email">Correo electrónico:</label>
                <input type="email" v-model="datos.email" name="" id="email"
                placeholder="usuario@correo.com"
                :class="{'input-error':errores.email}">
                <!--la clase dinámica solo se cumplirá bajo cierta 
                condición. Primero conoceremos a los personajes
                de la obra:
                'input-error': corresponderá a la clase que se pondrá
                errores.email -> condición a validar
                Por ejemplo si errores.email es vació-> Vue 
                de forma interna quitará la clase 'input-error'. 
                En caso que errores.email no sea vacío entonces
                renderizará la clase css 'input-error'-->
                <span v-if="errores.email" class="error-text">{{ errores.email }}</span>

            </div>
            <div class="form-group">
                <label for="asunto">Asunto:</label>
                <select v-model="datos.asunto" id="asunto">
                    <option value="">Seleccione una opción</option>
                    <option value="soporte">Soporte Técnico</option>
                    <option value="ventas">Ventas</option>
                    <option value="otros">Otros</option>
                </select>
            </div>
            <div class="form-group">
                <label>Tipo de cliente:</label>
                <div class="radio-group">
                    <label>
                        <input type="radio" value="persona"
                        v-model="datos.tipoCliente">Persona
                    </label>
                    <label>
                        <input type="radio" value="empresa"
                        v-model="datos.tipoCliente">Empresa
                    </label>
                </div>
            </div>
            <div class="form-group">
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje"
                v-model="datos.mensaje"
                placeholder="Describa su solicitud(mínimo 20 caracteres)"
                rows="4">


                </textarea>
                <small>{{ datos.mensaje.length }}/20 caracteres</small>
            
            </div>
            <div class="form-group checkbox-group">
                <label>
                    <input type="checkbox" v-model="datos.aceptaTerminos">
                    Acepto los términos y condiciones
                </label>
            </div>
            <button type="submit" :disabled="estaCargando">
                {{ estaCargando?'Procesando...':'Enviar solicitud' }}

            </button>
            <p v-if="errorGeneral" class="error-alert" role="alert">
                {{ errorGeneral }}
            </p>

        </form>
    </div>
</template>

<script setup>
import { ref, reactive, defineEmits, defineProps } from 'vue';

//Punto de contacto del padre al hijo
defineProps({
    estaCargando: Boolean
})

//Emit es un evento emitido en por el componente hijo al padre(App.vue)
const emit = defineEmits(['enviar']);

//creación de un objeto reactivo->reactive
const datos = reactive(
    {
        email: '',
        asunto: '',
        tipoCliente: 'persona',
        mensaje: '',
        aceptaTerminos: false //no acepta términos

    }
);

const errores = reactive({
    email: ''
});

const errorGeneral = ref('');

const validarEmail =
    (email) => {
        /*
        / /: apertura y cierre de un patrón en una expresion regulare
        ^ inicio de una cadena
        []: clases o conjunto de carecteres a evaluar en una expresión regular
    
        [^\s@]: cualquier caracter menos espacios y arroba al principio
        ejemplo @@@gmail.com se validan que no extab
        @[]: estamos obligando que la @ debe tener una posicion espefica
        @[^\s@]: estamos diciendo que luego de la @ no exista ningun espacio
        o @-> larissa@@@@.com christian@ @@@.com
        \. : valida la existencia de un
        \.[^\s@] : no permite esto usuario@sitio.@@ @@
    
        $: fin de la cadema a evaluar(patrón)
        test es un metodo de javascript para validar valores
        que deben cumplir una expresión regular. Retorna
        true o false
        */
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);//true o false

    };

//función de envío de formulario
const enviarFormulario =
    () => {
        //Resetear errores
        errores.email = '';
        errorGeneral.value = '';

        //validaciones 
        if (!validarEmail(datos.email)) 
        {
            errores.email ="Formato de correo inválido";
            return;

        }

        if(!datos.asunto) //si no hay asunto
        {
            errorGeneral.value="Por favor seleccione un asunto";
            return;

        }
        /*la propieda length aplicado a un string(cadena de texto)
        al igual que los arreglos tradicionales determinará el largo
    ; es decir cuanta es la cantidad de caracteres del mismo 
    
    */
        if(datos.mensaje.length<20) 
        {
            errorGeneral.value=
            "El mensaje no puede tener menos de 20 caracteres";
            return;

        }

        if(!datos.aceptaTerminos) 
        {
            errorGeneral.value ="Debe aceptar los términos";
            return;

        }

        //envir un evento al componente padre con el objeto datos listo
        emit('enviar',{...datos});

        
    };




</script>

<style scope>
.form-group{
    margin-bottom: 1.2rem;
    display: flex;
    flex-direction: column;
}
label{
    font-weight: bold;
    margin-bottom: 0.5rem;
}
input[type="text"],select,textarea{
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.input-error{
    border-color: #e74c3c;
}

.error-text{
    color:#e74c3c;
    font-size: 0.85rem;
    margin-top: 4px;
}

.error-alert{
    color: white;
    background-color: #e74c3c;
    padding: 10px;
    border-radius: 4px;
    margin-top: 10px;
}

.radio-group{
    display: flex;
    gap: 15px;
}

.checkbox-group{
    flex-direction: row;
    align-items: center;
    gap: 8px;
}


</style>