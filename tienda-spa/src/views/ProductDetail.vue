<template>
    <div class="card border-primary">
        <div class="card-header bg-primary text-white">
            <h4>Detalle del producto: {{ $route.params.id }}
            </h4>
            <div class="card-body">
                <nav class="nav nav-pills nav-fill mb-3 bg-light rounded shadow-sm">
                    <router-link :to="`/producto/${$route.params.id}/descripcion`"
                    class="nav-link text-uppercase fw-bold btn-inactive" active-class="active-light">
                        Descripción
                    </router-link>
                    <router-link :to="`/producto/${$route.params.id}/opiniones`"
                    class="nav-link text-uppercase fw-bold btn-inactive" active-class="active-light">
                        Opiniones
                    </router-link>

                </nav>
                <div class="p-3 bg-light border rounded">
                    <router-view></router-view>

                </div>
                <router-link to="/productos"
                class="btn btn-secondary mt-3">
                Volver a la lista
            </router-link>

            </div>

        </div>

    </div>
</template>

<style scoped>

.btn-inactive{
    background-color: #0d6efd;
    color: white;
}

.active-light{
    background-color: #f8f9fa !important;
    color: #0d6efd !important;
    border: 1px solid #dee2a6;
}


</style>