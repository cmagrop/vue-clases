<template>
    <div class="row">
        <h2 class="mb-4">Catálogo Productos</h2>
        <div class="col-md-4 mb-3" v-for="p in productos" :key="p.id">
            <div class="card h-100 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">{{ p.nombre }}</h5>
                    <p class="card-text">${{ p.precio }}</p>
                    <router-link :to="'/producto/'+p.id"
                    class="btn btn-outline-dark">
                        Ver más
                    </router-link>
                </div>

            </div>

        </div>


    </div>

    
</template>

<script>
export default
{
    data()
    {
        return{
            productos: [
                {
                    id:1,
                    nombre:'Laptop Gamer',
                    precio: 560000
                },
                {
                    id:2,
                    nombre:'Teclado mecánico',
                    precio: 95000
                },
                {
                    id:3,
                    nombre:'Monitor 4k',
                    precio:200000
                }
            ]
        }
    }
}
</script>