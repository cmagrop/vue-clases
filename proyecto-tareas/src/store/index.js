import { createStore } from 'vuex'

export default createStore({
  //definir un estado global->se puede acceder desde cualquier parte
  state: {
    tareas:[] //arreglo funcionará de forma global
  },
  //funciones derivadas del estado-getters(obtenedoras)
  /*t=>t.completada asumirá en el filtro que es verdadera,
  ya que filter realiza internamente un if donde
  dice que filtará todas las tareas basandose en que la condición
  t=>t.completada es true*/
  getters: {
    totalTareas: (state)=>state.tareas.length,
    tareasCompletadas: (state) => state.tareas
    .filter(t=>t.completada).length 


  },
  //mutaciones-> modifican directamente el estado
  mutations: {
    AGREGAR_TAREA(state,nuevaTarea){
      state.tareas.push(nuevaTarea); //guarda la tarea
    },
    ALTERNAR_COMPLETA(state,index){
      state.tareas[index].completada=!state.tareas[index].completada;

    },
    ELIMINAR_TAREA(state,index){
      state.tareas.splice(index,1);
    }
  },
  //funciones especiales que pueden contener una lógica adicional(asincronía, validaciones)
  actions: {
    agregarTarea({commit},tarea){
      commit('AGREGAR_TAREA',tarea); //se valida el guardado
    },
    completarTarea({commit},index)
    {
      commit('ALTERNAR_COMPLETA',index);

    },
    eliminarTarea({commit},index)
    {
      commit('ELIMINAR_TAREA',index);

    }
  },
  //permitir dividir en parte mas pequeñas el store
  modules: {
  }
})
