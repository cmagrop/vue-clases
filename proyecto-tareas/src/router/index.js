import { createRouter, createWebHistory } from 'vue-router'
//Importar las vista a usar
import Tareas from '../views/TareasView.vue'
import Estadisticas from '../views/EstadisticasView.vue'

const routes = [
  {
    path:'/',
    name:'tareas',
    component: Tareas
  },
  {
    path:'/estadisticas',
    name:'estadisticas',
    component:Estadisticas

  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
