import { createRouter, createWebHistory } from 'vue-router'
import CatalogoView from '../views/CatalogoView.vue'
import FormularioView from '../views/FormularioView.vue'


const routes = [
  {
    path:'/',
    name:'Catalogo',
    component:CatalogoView
  },
  {
    path:'/agregar',
    name:'Formulario',
    component:FormularioView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
