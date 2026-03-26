<template>
  <!--
  <v-app :theme="theme">: v-app es una directiva de Vuetify que
    permite declarar una app
  <v-app-bar color="primary" elevation="2">: representa un navbar 
    en Vuetify, color es primary(azul claro) y elevation nos
    permite determinar una sombra leve sobre el navbar


  
  
  -->
  <v-app :theme="theme">
    <v-app-bar color="primary" elevation="2">
      <v-app-bar-title> <!--permite definir un titulo al navbar-->
        Vue Product Showcase
      </v-app-bar-title>
      <v-spacer></v-spacer> <!--define un espaciado con Vuetify-->
      <v-btn icon @click="toggleTheme">
        <v-icon> <!--directiva de íconos de Vuetify y 
          el mdi: material design icons-->
          {{ 
          theme==='light'?'mdi-moon-waning-crescent':'mdi-white-balance-sunny'  
          }}
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main :class="theme==='light'?'bg-grey-lighten-6':''"> <!--main etiqueta semantica de html-->
      <v-container><!--contenedor de Vuetify-->
        <v-row class="mb-6" align="center"><!--filas dentro del contenedor
          mb-6: margin-botton de 6, align="center" el contenido esta centrado verticalmente
          cols define un universo de 12 columnas
          md="4" dice que en medium devices(laptop) me ocupe
          solo 4 columnas de las 12
          -->
          <v-col cols="12" md="4">
            <!--variant="solo" será una variante que dará un color
            blanco/gris con sombra leve
            hide-details eliminará cualquier espacio sobrante entre los elementos-->
            <v-select 
             label="Filtrar por Categoría"
             :items="['Todos','Computación','Móviles','Periféricos','Audio & Video','Hogar Inteligente']"
             variant="solo"
             hide-details 
             @update:model-value="updateFilter"
             >
              
            </v-select>

          </v-col>
          <!--md="8": que en las medium devices me ocupe 8 de 12 columnas-->
          <v-col cols="12" md="8" class="text-right">
            <v-chip color="primary">
              Total: {{ filteredProducts.length }}
            </v-chip>

          </v-col>

        </v-row>
        <div v-if="loading" class="text-center my-10">
          <v-progress-circular indeterminate size="64" color="primary">
          </v-progress-circular>
          <p class="mt-4">Obteniendo productos...</p>

        </div>
         <!-- v-if="error :error sea distinto de null
          type="error": nos permitirá establecer color e icono predeterminado de Vuetify
          variant="elevated"-> establecer una sombra al alert
          closable: agregar una x de cierre en la parte superior derecha de alert

         -->
        <v-alert v-if="error" type="error" variant="elevated" class="mb-5" closable>
          {{ error }}
        </v-alert>

        <!--loading sea false: los productos ya fueron cargados
        y elimina el v-progress-circular-->
        <v-row v-if="!loading">
          <v-col v-for="item in filteredProducts" :key="item.id" cols="12" sm="6" lg="4">
            <ProductCard 
            :product="item"
            :isFavorite="favorites.includes(item.id)"
            @toggle-fav="toggleFavorite"
            />

          </v-col>

        </v-row>
        
      </v-container>


    </v-main>

  </v-app>

</template>

<script>
//mapeadores: son funciones que nos permititán manipular el store
import { mapState,mapGetters,mapActions,mapMutations } from 'vuex';
import ProductCard from './components/ProductCard.vue';//componente hijo


export default{
  components:{ProductCard},
  data:()=>({
    theme:'light'
  }),
  computed: //se llama una vez y se guarda en la memoria cache
  {
    ...mapState(['loading','error','favorites']),
    ...mapGetters(['filteredProducts'])
  },
  methods: //se recarga cada vez que es requerido
  {
  
    ...mapActions(['getProducts']),
    ...mapMutations(['SET_FAVORITE','SET_FILTER']),
    toggleTheme()//alterne el tema-interruptor
    {
      this.theme=this.theme==='light'?'dark':'light';

    },
    updateFilter(val){
      this.SET_FILTER(val);
    },
    toggleFavorite(id){
      this.SET_FAVORITE(id);
    }

  },
  mounted() 
  {
    this.getProducts();//ciclo de vida de la carga inicial
  }

}

</script>