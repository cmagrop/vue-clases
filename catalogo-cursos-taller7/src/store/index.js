import { createStore } from 'vuex'
import axios from 'axios'
//declaramos la variable MOCK_API_URL y su endpoint
const MOCK_API_URL="https://69c0b15b085e1a9fae3ede38.mockapi.io/productos";

export default createStore({
  state: {
    products:[],
    favorites: JSON.parse(localStorage.getItem('favs'))||[],
    filterCategory: 'Todos',
    loading: false,
    error:null
  },
  getters: {
    filteredProducts:
    (state)=>{
      if(state.filterCategory==='Todos')
      {
        return state.products;
      }
      return state.products.filter(
        p=>p.categoria===state.filterCategory
      )
    }
  },
  mutations: {
    /* establecer productos curso */
    SET_PRODUCTS(state,data){
      state.products=data;
    },

    SET_LOADING(state,status)
    {
      state.loading= status;
    },

    SET_ERROR(state,msg){
      state.error=msg;
    },

    SET_FILTER(state,category)
    {
      state.filterCategory=category;
    },

    SET_FAVORITE(state,productId)
    {
      /* indexOf si el indice existe, me retornará la posición dentro del arreglo
      si el índice no existe , retornará -1 */
      const index = state.favorites.indexOf(productId); //retorne la posición dentro del arreglo
      if (index>-1) //el producto ya está en favoritos 
      {
        state.favorites.splice(index,1);//eliminaremos solo el elemento que ya existe de favoritos
        
      } else //el producto no está en favoritos
      {
        state.favorites.push(productId); //agregando un nuevo id a los favoritos
        /* el metodo stringify convierta cualquier objeto en texto
        ya que el localStorage es limitado y sólo permite cadenas de texto */
        localStorage.setItem('favs',JSON.stringify(state.favorites));
        
      }


    }

  },
  actions: {
    async getProducts({commit})
    {
      commit('SET_LOADING',true); //pasar de false a true
      commit('SET_ERROR',null); 
      try {
        const response = await axios.get(MOCK_API_URL); 
        commit('SET_PRODUCTS',response.data);
        
      } catch (error) {
        commit('SET_ERROR','No se pudo conectar');
        
      }
      finally{
        commit('SET_LOADING',false);
      }
    }
  },
  modules: {
  }
})
