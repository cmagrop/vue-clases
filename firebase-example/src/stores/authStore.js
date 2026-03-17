import { defineStore } from "pinia";
import { auth } from "../firebase/config";
/*
Funciones de trabajo con Authentication de Firebase

createUserWithEmailAndPassword: método que permite crear un usuario y contraseña,
signInWithEmailAndPassword: permite iniciar sesion con usuario y contraseña
signOut: cerrar sesión
*/
import {
    createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

export const useAuthStore = defineStore('auth',
    {
        /*
        con ({}): la función retornará un objeto independiente
        sin {}: la función no retorna el objeto completo, si no que retorna
        undefined 
        
        */
        state: () => ({
            user: null
        }),
        actions: {

            //registrar a un usuario
            async register(email, password) {
                //auth: id de la creación del Store
                const res = await createUserWithEmailAndPassword(auth, email, password);
                this.user = res.user; //this.user guardará las configuraciones del usuario creado en auth

            },
            //login del usuario
            async login(email, password) {
                const res = await signInWithEmailAndPassword(auth, email, password);
                this.user = res.user;
            },
            //logout-> cierre
            async logout() {
                await signOut(auth); //mandando la sesion actual(auth) para el cierre
                this.user = null;
            }

        }
    }
); 