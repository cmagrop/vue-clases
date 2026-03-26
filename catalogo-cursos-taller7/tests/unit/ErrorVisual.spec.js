import App from "@/App.vue";
import { mount } from "@vue/test-utils";
import { createStore } from "vuex";

/*
Mock: permite crear un objeto que no sólo puede devolver valores
si no que está programado para esperar algo.Verifica la interactividad
El mock permite detectar el comportamiento.
Stub: es un objeto que permite definir respuestas a las llamadas
realizadas durante la prueba. Su objetivo es definir un valor
para que el test pueda continuar.

*/

describe('Validación de errores en App.vue',()=>{
    it('Muestra un error de alerta cuando exista un error en el estado',
        async ()=>{
            const mensajeError = 'No se pudo conectar';
            //crear un Mock Store para inyectar errores manualmente
            const mockStore = createStore(
                {
                    state:{
                        error:mensajeError,
                        loading: false,
                        products:[],
                        favorites:[],
                        filterCategory:'Todos'
                    },
                    getters:{
                        filteredProducts:() => []
                    },
                    actions:{
                        /*espía que simulará la función
                        sin ejecutar la lógica real*/
                        getProducts:jest.fn()
                    }
                }
            );

            //montar un componente con stubs
            //mount: crea una instancia real del componente y sus hijos
            const wrapper = mount(App,{
                global:{
                    plugins:[mockStore],// nos permiten importar mockStore
                    stubs:{
                        //que se usa el slot para simular el contenido interior
                        'v-app':{template:'<div><slot/></div>'},
                        'v-main':{template:'<div><slot/></div>'},
                        'v-container':{template:'<div><slot/></div>'},
                        'v-app-bar': {template:'<div><slot/></div>'},
                        'v-app-bar-title':{template:'<div><slot/></div>'},
                        'v-spacer':{template:'<div></div>'},
                        'v-btn':{template:'<button><slot/></button>'},
                        'v-icon':{template:'<i></i>'}, //i: ícono,
                        'v-row':{template:'<div><slot /></div>'},
                        'v-col':{template:'<div><slot /></div>'},
                        'v-select':{template:'<div></div>'},
                        'v-chip':{template:'<div><slot /></div>'},
                        'v-progress-circular':{template:'<div></div>'},
                        'ProductCard':{template:'<div></div>'},
                        'v-alert':{template:'<div class="v-alert-mock"><slot /></div>'}
                    }
                }

            });

            //verificar que v-alert aparezca con el texto correcto
            const alerta= wrapper.find('.v-alert-mock');
            expect(alerta.exists()).toBe(true);
            expect(alerta.text()).toContain(mensajeError);
        }
    )

})
