<template>
    <div class="estado">
        <h2>Estadísticas</h2>
        <p>Total Tareas: {{ totalTareas }}</p>
        <p>Tareas Completadas: {{ tareasCompletadas }}</p>
    </div>
</template>

<script>
export default{
    name: 'EstadisticaView',
    /* computed: tareas calculadas, funciones que se comportan
    como variables reactivas  */
    computed:{
        totalTareas(){
            return this.$store.getters.totalTareas;

        },
        tareasCompletadas(){
            return this.$store.getters.tareasCompletadas;

        }
    }
}
</script>