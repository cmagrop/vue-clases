<template>
    <div class="tareas">
        <h2>Mis Tareas</h2>
        <input v-model="nuevaTarea" @keyup.enter="agregar" placeholder="¿Qué hay que hacer">
        <button @click="agregar">Agregar</button>
        <ul>
            <li v-for="(tarea,index) in $store.state.tareas" :key="index">
                <span :style="{textDecoration: tarea.completada? 'line-through':'none'}">
                    {{ tarea.texto }}
                </span>
                <button @click="$store.dispatch('completarTarea',index)">✔</button>
                <button @click="$store.dispatch('eliminarTarea',index)">❌</button>

            </li>
        </ul>
    </div>
</template>

<script>
export default{
    data(){ //define valores reactivos del componente
        return {nuevaTarea:''}
    },
    methods:
    {
        agregar(){
            if(this.nuevaTarea.trim()) //¿this.nuevaTarea existe?, trim(): borra espacios blancos
            {
                /*
                $store hará referencia el store de Vue,
                dispatch: despachar la acción->ejecuta 
                agregarTareas será un metodo que definiremos en el index.js
                de store, */
                this.$store.dispatch('agregarTarea',{
                    texto:this.nuevaTarea,
                    completada: false
                })
                //reseta el campo de la tarea
                this.nuevaTarea='';

            }
        }
    }


}

</script>