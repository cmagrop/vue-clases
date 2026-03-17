<template>
    <div class="auth-container">
        <h2>Iniciar Sesion</h2>
        <form @submit.prevent="handleLogin">
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

            <button type="submit">Entrar</button>

        </form>
        <p>
            ¿No tienes cuenta?
            <router-link to="/register">Registrate aquí</router-link>
        </p>
    </div>

</template>

<script setup>
//importaciones necesarias
import { useAuthStore } from '@/stores/authStore';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
//definir las variables
const email = ref('');
const password = ref('');
const authStore = useAuthStore();
const router = useRouter();

//metodo validacion
const handleLogin =
async()=>{
    try {
        await authStore.login(email.value,password.value);
        router.push('/dashboard');
        
    } catch (error) {
        alert("Error al iniciar sesión");
        
    }
}; 



</script>