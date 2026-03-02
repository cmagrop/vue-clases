<template>
    <div class="card h-100 shadow-sm">
        <!--
        :src="imagen" -> hay etiqueta llamada src donde imagen será
        el  nombre del atributo perteneciente al objeto 
        definido en el props 
        card-img-top-> aplicar configuraciones especificas a la imagen
        del card donde le quitará los bordes laterales  y además
        redondeará las esquinas para posicionarla en la parte superior
        del card
        alt:"nombre"-> el atributo alt ayuda al SEO por la descripcion
        de una imagen y adicionalmente a la experiencia de usuario
        por mostrar un mensaje sobre el contenido de la imagen emergente

        object-fit: cover;  propiedad que adaptará la imagen a una medida
        especifica, escalando la imagen(adaptar la imagen sin perder 
        resolución)
        flex-column-> flex-direction:column;
        -->
        <img :src="imagen" class="card-img-top" :alt="nombre"
        style="object-fit: cover; height: 200px;">

        <div class="card-body d-flex flex-column">
            <h5 class="card-title">{{ nombre }}</h5>
            <h6 class="card-subtitle mb-2 text-primary fw-bold">
                {{ precio }}
            </h6>
            <div class="card-text text-muted mb-3" v-html="descripcion">
            </div>

            <!-- mt-auto -> margin-top automatico 
             slot-> espacio reservado en un componente(ProductoCard)
             disponible para alojar elementos desde un componente
             padre como por ejemplo un enlace, imagen, link,etc-->
            <div class="mt-auto">
                <slot></slot>
            </div>

        </div>



    </div>

</template>

<script setup>
/*props: son propiedades que pueden traspasadas 
desde un componente padre a un componente hijo*/
defineProps(
    {
        nombre: String,
        precio: Number,
        imagen: String,
        descripcion: String
    }
);
</script>