import { createStore } from 'vuex'

export default createStore({
  state: {
    productos: [
      {
        id: 1,
        nombre: 'Don Quijote',
        precio: 18000,
        stock: 5,
        categoria: 'clásicos',
        oferta: true
      },
      {
        id: 2,
        nombre: 'La ruta del vino',
        precio: 15000,
        stock: 0,
        categoria: 'viajes',
        oferta: false
      }
    ]

  },
  //los getters son funciones que calculan propiedades computadas del estado
  getters: {
    //Getter que recibe parámetro para filtrar en el catálogo
    filtrarCatalogo: (state) => {
        return (termino) => {
        const search = termino.toLowerCase(); //termino en minuscula
        console.log("estoy en filtrar catalogo");
        console.log(termino);
        return state.productos.filter(
          p => p.nombre.toLowerCase().includes(search) ||
            p.categoria.toLowerCase().includes(search)
        );

      }
    }
  },
  /* producto->{id:5,nombre:'Perico trepa por chile,precio:20000,stock:6,categoria:'viajes'
  oferta:true} 
  id,
  nombre
  precio
  stock
  categoria
  oferta

  
  */
  mutations: {
    AGREGAR_PRODUCTO(state, producto) {
      state.productos.push({ ...producto, id: Date.now() });
    },
    ELIMINAR_PRODUCTO(state, id) {
      /*index retornará con findIndex -1 si no fue encontrado o
      la posición del índice si lo encontró
    */
      const index = state.productos.findIndex(p => p.id === id);
      if (index !== -1) {
        state.productos.splice(index, 1);
      }

    }

  },
  actions: {
    registrarProducto({ commit }, datosProducto) {
      commit('AGREGAR_PRODUCTO', datosProducto);
    },
    borrarProducto({ commit }, id) {
      commit('ELIMINAR_PRODUCTO', id);
      /*commit invocará a ELIMINAR_PRODUCTO, no le manda
      el state porque internamente asume que hay un state 
      sin embargo le manda el segundo parámtro que es id
      que permitirá el correcto filtrado para eliminar el
      elemento
      */


    }

  },
  modules: {
  }
})
