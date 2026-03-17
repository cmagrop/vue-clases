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