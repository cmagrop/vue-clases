import TodoApp from "@/components/TodoApp.vue";
import { api } from "@/services/api";
api
import { shallowMount } from "@vue/test-utils";
/*mock es un objeto sumulado que permie y verificar como fue usado  */
jest.mock('@/services/api',
  ()=>({
    api:{
      saveTodo: jest.fn(()=>true)
    }

  })
);

describe('Pruebas Todo',()=>{
//1.-validar que un componente rederice correctamente
it('renderiza correctamente el titulo via props',
  ()=>{
    /* shallowMount montar un componente y luego
    se le pasa un prop title */
    const wrapper = shallowMount(TodoApp,
      {
      propsData:{title:'Mi Lista de Tareas'}
      }
  );
  /*resultado esperado de la prueba */
  expect(wrapper.find('h1').text())
  .toContain('Mi Lista de Tareas');
    
  }
);

//prueba 2
it('agrega una tarea al hacer click y limpia el input',
  async ()=>{
    const wrapper = shallowMount(TodoApp);
    const input = wrapper.find('[data-testid="todo-input"]');
    const button = wrapper.find('[data-testid="todo-button"]');
    //establecer (setear) un valor un luego disparar un evento onclick

    await input.setValue('Tarea 1'); //esteblece un valor al input
    await button.trigger('click'); //disparar un evento onclick en el boton
    //verificar llamado a la api simulado
    expect(api.saveTodo).toHaveBeenCalledWith('Tarea 1');
    //verificar el estado interno del arreglo todos
    /*
    wrapper: contenedor
    vm: que permite acceder directamente a la instancia de Vue
    es decir, nos permite acceder a sus datos, metodos, propiades computadas,
    etc
    Valida que dentro de todos esté Tarea 1
    */
    expect(wrapper.vm.todos).toContain('Tarea 1');
    //verificar si se emitó el evento
    /* emmited(): será un método que permitirá validar el emit 
    wrapper.emitted()-> crear un objeto con todos los eventos
    que se generaron al emitir la prueba 
    added: clave dentro del objeto creado
    {
    added:[
    ['Tarea 1'] //posición 0 del arreglo

    ]
    }
    toEqual: verificará si en el areglo added posición existe
    un valor llamado ['Tarea 1']
    */
    
    expect(wrapper.emitted().added[0]).toEqual(['Tarea 1']);
    //Verificar el estado de la lista
    expect(wrapper.find('li').text()).toBe('Tarea 1');
    //validar que el input se haya limpiado
    expect(input.element.value).toBe('');


  }
)



}
);