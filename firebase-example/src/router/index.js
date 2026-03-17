import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from '../stores/authStore'


const routes = [
  {
    path:'/',
    redirect:'/login'

  },
  {
    path:'/login',
    name:'Login',
    component: () => import('../views/LoginView.vue')

  },
  {
    path:'/register',
    name:'Register',
    component: () => import('../views/RegisterView.vue')
  },
  {
    path:'/dashboard',
    name:'DashBoard',
    component: () => import('../views/DashBoardView.vue'),
    meta: {requiresAuth:true} //requiere autenticación
  }

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*
beforeEach-> se ejecuta antes de cambio de ruta
to:la ruta que el usuario quiere ir
from: la ruta desde la que viene
next: función que decide si se permite la navegación, se redirige o bloquea
matched: es una propuedad de to, donde representa a un arreglo de objetos de ruta
que coincide con la ruta solicitada
some(): es un método de javascript que devolverá un true si se cumple cierta condición
*/
router.beforeEach(
  (to,from,next)=>{
    const authStore= useAuthStore();//accediento al store de Pinia para guardar al usuario
    const requiresAuth= to.matched.some(record=>record.meta.requiresAuth);//true:si necesita autenticación
    //bloquea el acceso al DashBoard si no hay usuario
    if(requiresAuth && !authStore.user){
      next('/login'); //redirecciona al login
    }
    //Evita el usuario vuelva al login o register
    /*
    Si usuario decide entrar a /login o /register eso dará un true
    y adicionalmente(&&) el usuario debe estar registrado en el store.
    Si esto resulta verdadero, comienza la acción
    */
    else if( (to.path==='/login' || to.path==='/register') && authStore.user)
    {
      next('/dashboard'); // nos lleva al dashboard
    }

    else{
      next(); //que esta en el dashboard
    }


  }
);


export default router
