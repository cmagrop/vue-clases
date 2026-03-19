<template>
    <div class="auth-container">
        <h2>Crear cuenta</h2>
        <form @submit.prevent="handleRegister">
            <!--se copia la misma estructura del LoginView-->
            <div>
                <label>Email:</label>
                <input type="email" v-model="email"
                placeholder="correo@correo.com" required>

            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" v-model="password"
                 placeholder="ingrese contraseña" required>

            </div>

            <button type="submit">Registrar</button>


        </form>
        <p>
            ¿Ya tiene cuenta?
            <router-link to="/login">Inicia Sesion</router-link>
        </p>
    </div>
</template>
<script setup>
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

//definición de variables
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

const handleRegister = 
async ()=>{
    try {
        //invocamos a la función register de authStore
        await authStore.register(email.value,password.value);
        router.push("/dashboard")
    } catch (error) {
        alert("Error de registro");
        
    }
};


</script>

<style scoped>
.auth-container{
    max-width: 400px;
    margin: 50px auto;
    padding: 2rem;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.8);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    text-align: center;
}

form div{
    margin-bottom: 1.2rem;
    text-align: left;
}

label{
    display: block; /*toma el ancho completo del contenedor */
    margin-bottom: 0.5rem;
    font-weight: bold;
    font-size: 1rem;

}

input{
    width: 100%;
    padding: 12px;
    border: 1px solid rgb(5, 16, 101);
    border-radius: 8px;
    box-sizing: border-box;
}

button{
    width: 50%;
    padding: 12px;
    background-color: green;
    color: white;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
}

button:hover{
    background-color: white;
    color: green;
    border: 1px solid green ;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.8);
}

</style>