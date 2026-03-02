<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-lg-6">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-dark text-white p-3">
            <h5 class="mb-0 text-center">Registro Pedidos</h5>

          </div>

          <!--Crear formulario-->
          <div class="card-body p-4">

            <form @submit.prevent="enviarPedido">
              <div class="mb-3">
                <label class="form-label fw-semibold">
                  Producto
                </label>
                <select v-model="pedido.producto" class="form-select"
                :class="{'is-invalid':!pedido.producto}">
                <!--
                class="{'is-invalid':!pedido.producto}" significa
                que coloque is-invalid (clase de Bootstrap ) siempre
                y cuando se cumpla que el producto es vacio
                -->
                <option value="" disabled>
                  Selecciones una opción...
                </option>
                <option v-for="p in productos" :key="p"
                :value="p">
                {{ p }}
                </option>

                </select>
              </div>
              <!--Campo Cantidad-->
              <div class="mb-3">
                <label class="form-label fw-semibold">Cantidad</label>
                <input type="number" v-model.number="pedido.cantidad"
                class="form-control" :class="{'is-invalid':pedido.cantidad<=0}">
              </div>
              <!--Campos extras
              d-block equivale a un display:block
              -->
              <div class="mb-3">
                <label class="form-label d-block fw-semibold">Extras</label>
                <div class="row">
                  <div v-for="op in extras" :key="op"
                  class="col-6 mb-2">
                  <div class="form-check">
                    <input type="checkbox" class="form-check-input" 
                    :value="op" v-model="pedido.opciones" :id="op">
                    <label class="form-check-label" :for="op">{{ op }}</label>
                  </div>

                  </div>
                </div>
              </div>
              <div class="mb-3">
                <label class="form-label fw-semibold">
                  Dirección de entrega
                </label>
                <textarea v-model="pedido.direccion" class="form-control" rows="2"
                placeholder="Calle,numero...">
                </textarea>
              </div>
              <div class="mb-4">
                <label class="form-label d-block fw-semibold">
                  Método de envío
                </label>
                <div class="form-check form-check-inline">
                  <input type="radio" class="form-check-input"
                value="estándar" v-model="pedido.metodoEnvio" id="std">
                  <label class="form-check-label" for="std">Estándar</label>
                </div>

                <div class="form-check form-check-inline">
                  <input type="radio" class="form-check-input"
                value="express" v-model="pedido.metodoEnvio" id="exp">
                  <label class="form-check-label" for="exp">Express</label>
                </div>
                
              </div>

              <div v-if="error" class="alert alert-warning py-2 small mb-3">
                <strong>Atención: </strong>{{ error }}
              </div>
              <!--
              :disabled="!!error" desactivará el boton si es que no se 
              cumplen con que los campos tengan valores. Si faltan valores
              no se ejecutará el metodo enviarPedido  

              Se ocupa la doble negación !! aunque se vea reiterativo
              para tratar la respuesta de las propiedades computadas de 
              error. El método tiene un return null que si se llegase a ejecutar
              provocará que retorne un null si es que no ocupamos la doble 
              negación ya que es un valor falsy. Si ocupamos la doble negación
              retornará false y no null
              
              -->
              <button class="btn btn-primary w-100 py-2 fw-bold"
              :disabled="!!error">
                Confirmar pedido
              </button>


            </form>

          </div>

        </div>
      </div>
      <div class="col-lg-4 mt-4 mt-lg-0">
        <div class="card bg-light border-0">
          <div class="card-body">
            <h5 class="card-title mb-4">Resumen del pedido</h5>
            <div class="d-flex justify-content-between mb-2"> 
              <span>Producto: </span>
              <span class="fw-bold">{{ pedido.producto||'-' }}</span>
            </div>
            <div class="d-flex justify-content-between mb-2"> 
              <span>Cantidad: </span>
              <span class="fw-bold">{{pedido.cantidad}}</span>
            </div>
            <hr>
            <div class="mb-2 text-muted small">
              <span class="d-block mb-1 fw-semibold text-dark">
                Adicionales: 
              </span>
              <!--v-if="pedido.opciones.length" validará si
              hay o no valores dentro del arreglo. Si es 0
              lo tomará como falso(falsy) y si es mayor que 0 
              lo tomará com verdadero(truly)
              join transformará el arreglo en un texto
              donde el parametro recibido será el separador
              de cada elemento del array en su representación
              de texto. En el ejemplo es una ,-->
              <span v-if="pedido.opciones.length">
                {{ pedido.opciones.join(',') }}
              </span>
              <span v-else>
                ninguno
              </span>



            </div>

            <div class="mb-2 text-muted small">
              <span class="d-block mb-1 fw-semibold text-dark">
                Entrega en: 
              </span>
              <span>{{ pedido.direccion||'Pendiente' }}</span>
            </div>
            <div class="mt-3">
              <span class="badge" 
              :class="pedido.metodoEnvio==='express'?
              'bg-danger':'bg-success'">
                {{ pedido.metodoEnvio.toUpperCase() }}
              </span>
            </div>

          </div>

        </div>
      </div>

    </div>

  </div>
  

</template>

<script setup>
/*

computed(propiedades computadas de Vue):
sirven para crear datos que dependen de otros */
import { ref, computed} from 'vue';
/*

Ejemplo básico de uso de computed-> no forma parte del proyecto

const cantidad = ref(1);
const precioUnitario = 100;

const precioTotal = computed(
  ()=>{
    return cantidad.value*precioUnitario;
  }
)

*/

const pedido = 
ref(
  {
    producto: '',
    cantidad: 1,
    opciones: [],
    direccion:'',
    metodoEnvio:'Estándar'
  }
);

//Datos 
const productos =
['Pizza Napolitana','Hamburguesa Premium',
'Ensalada Veggie','Sushi Box'];
const extras = ['Doble Queso','Salsa picante','Bebida 500ml',
  'Papas fritas'
]

/*validaciones de formulario usando computed()
if(pedido.value.producto)-> si la variable producto del objeto
pedido tiene valor entonces realiza tal cosa
if(!pedido.value.producto)-> Si la variable producto del objeto pedido 
es vacía
*/
const error =
computed(
  ()=>{
    if(!pedido.value.producto)
    {
      return "Debes seleccionar un producto";
    }

    if(pedido.value.cantidad<=0){
      return "La cantidad debe ser mayor a 0";

    }
    return null;/*cuando no entra en ninguno de los casos anteriores */

  }
);

//simular envío

const enviarPedido =
()=>{

  alert("¡Pedido registrado con éxito");
};

</script>

<style>

</style>
