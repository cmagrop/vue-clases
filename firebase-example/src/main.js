import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//importaciones extras
import { createPinia } from 'pinia'
import { auth } from './firebase/config'
import { onAuthStateChanged } from 'firebase/auth'
import { useAuthStore } from './stores/authStore'

let app

onAuthStateChanged(
    auth,
    (user)=>{
        if(!app) //si app no tiene un valor definido, se creará la app
        {
            const pinia = createPinia();
            app= createApp(App)
            .use(pinia)
            .use(router)
            .mount('#app')

        }

        //sincroniza el usuario con el store global
        const authStore = useAuthStore();
        authStore.user = user; 


    }
);


//createApp(App).use(router).mount('#app')
