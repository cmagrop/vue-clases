<template>
<form @submit.prevent="enviar">
    <div>
        <label>Nombre</label>
        <input type="text" v-model.trim="nuevo.nombre" required>
    </div>
    <div>
        <label>Precio</label>
        <input type="number" v-model.number="nuevo.precio">
    </div>
    <div>
        <label>Stock</label>
        <input type="number" v-model.number="nuevo.stock">
    </div>
    <div>
        <label>¿Es oferta?</label>
        <input type="checkbox" v-model="nuevo.oferta">
    </div>
    <button type="submit">Guardar</button>
</form>
</template>

<script>
export default{
    data(){
        return{
            nuevo:{
                nombre:'',
                precio:0,
                stock:0,
                oferta:false,
                categoria:''
            }
        }
    },
    methods:
    {
        enviar(){
            this.$store.dispatch('registrarProducto',this.nuevo);
            //retorne a la vista de catalogo
            this.$router.push('/');
        }
    }
}
</script>