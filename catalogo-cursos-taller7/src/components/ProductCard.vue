<template>
    <!-- agregar un card usando vuetify
     v-card es una sintaxis(componente) de vuetify
     mx-auto: genera márgenes laterales automaticos
     flex-column genera un contenedor
     flex y ademas un flex-direction: column
     elevation permite generar una sombra en Vuetify
     -->
     <v-card class="mx-auto d-flex flex-column"
      height="100%" elevation="3">
<!--v-img es una directiva de Vuetify
:src es equivalente a escribir v-bind:src que permite la reactividad
product.image signfica que le asigna la imagen de un objeto que será
enviado desde el componente del hijo.
cover es la propiedad de css en que la imagen cubre todo el contenedor
fill-height equivale a la clase de boostrap h-100
donde significa en css height:100%
ma-0: que todos los márgenes serán de 0px
align:center permitirá centrar verticalmente el contenido
justify="center" centrará el contenido horizontalmente(x)

indeterminate hara que el el progress-circular de vueltas de forma
indeterminada 
color: gray-lighten-5 es una propiedad que establecerá un color
gris , el mas claro posible que es el 5

-->
      <v-img :src="product.image" height="180px" cover >
        <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center" >
                <v-progress-circular indeterminate color="grey-lighten-5">
                    
                </v-progress-circular>

            </v-row>

        </template>

      </v-img>

      <!--crearemos los items de un card
      un v-card-item  es una estructura que se encarga exclusivamente
      de organizar el encabezado de una card 
      text-h6-> dira que el titulo será de tipo h6  
      v-chip corresponde a una etiqueta(badges)-->
      <v-card-item>
        <v-card-title class="text-h6">
            {{ product.title }}
        </v-card-title>
        <v-chip size="x-small" color="secondary" class="mt-1" >
            {{ product.area }}
        </v-chip>
        
      </v-card-item>
      <!--v-card-text define el cuerpo principal de texto del card-->
      <v-card-text class="flex-grow-1">
        {{ product.description }}
      </v-card-text>
      <v-divider></v-divider>/*divide el card->linea */
      /*
            v-card-actions es una etiqueta que permite definir
            en un card el conjunto de botones que los acompañarán
            v-btn-> elemento botón
            el identificador del emit 'toggle-fav' significa en español
            alternar favoritos
            $emit que manda un evento desde el hijo al padre 
 
      */
      <v-card-actions>
        <v-btn
        :icon="isFavorite?'mdi-heart':'mdi-heart-outline'"
        :color="isFavorite?'red':'grey'",
        @click="$emit('toggle-fav',product.id)"
        >
        </v-btn>
      </v-card-actions>
      <!--espacio-->
      <v-spacer> </v-spacer>
      <!--
      tonal significa una variante el color de fondo es 
      levemente opacado por el actual color de texto
      color primary es un azul-->
      <v-btn  variant="tonal" color="primary">Inscribirme</v-btn>


     </v-card>

</template>

<script>
export default{

    props:{
        product: Object,
        isFavorite: Boolean
    }
}

</script>