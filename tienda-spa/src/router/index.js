import { createRouter, createWebHistory } from 'vue-router'
//importación de vistas
import HomeView from '../views/HomeView.vue'
import NotFound from '../views/NotFound.vue'
import ProductDetail from '../views/ProductDetail.vue'
import ProductList from '../views/ProductList.vue'

//importar componentes de vistas
import ProductDescription from '../components/ProductDescription.vue'
import ProductReviews from '../components/ProductReviews.vue'


const routes = [
  {
    path:'/' ,
    name:'Home',
    component: HomeView
  },
  {
    path:'/productos',
    name:'Products',
    component: ProductList,
    alias:'/items'
  },
  {
    path:'/producto/:id', //id es una variable dinámica que dependerá del id del producto,
    name:'ProductDetail',
    component:ProductDetail,
    children:[
      {
        path:'descripcion',
        name:'ProductDesc',
        component:ProductDescription
      },
      {
        path:'opiniones',
        name:'ProductReviews',
        component:ProductReviews

      }
    ]
  },
  {
    /*
    /: es el slash de cualquier ruta
    :pathMatch 
    (.*)-> capture todo lo que escriba
    *-> permitirá que capture varios /
    */
    path:'/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
