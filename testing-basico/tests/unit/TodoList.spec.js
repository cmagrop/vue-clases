//importaciones @/componentes esta en fase experimental en Vue3
//import TodoList from "@/components/TodoList.vue";
import TodoList from '../../src/components/TodoList.vue';
import { mount } from "@vue/test-utils";

//definición de un conjunto de pruebas 
describe('TodoList Tests',
    ()=>{
        //prueba 1
        it('renderización y existencia de etiqueta data-test',
            ()=>{
                const wrapper =mount(TodoList); //montamos el componente
                /*
                expect(wrapper.find('[data-test="empty-msg"]').exists());

                esto a esperando que del contendor(wrapper) encuentres(find)
                una etiqueta llamada data-test="empty-msg (va entre llaves cuadradas)"
                y luego que valides si existe o no existe.
                Luego validar la existencia, usaremos toBe(true) para determinar
                si existía originalmente en el árbol DOM
                */
                expect(wrapper.find('[data-test="empty-msg"]').exists()).toBe(true);
            }
        )
        //prueba 2-> validar si se puede agregar una tarea
        it('debe agregar una tarea y limpiar el input',
            async ()=>{
                const wrapper = mount(TodoList)
                const input = wrapper.find('[data-test="todo-input"]')//encontrar la etiqueta
                await input.setValue('Celebrar estudiando') //simula búsqueda en barra
                await wrapper.find('[data-test="add-button"]').trigger('click')//simula clickear botón

                /*validar que el arreglo vinculado a la etiqueta que se llama tasks
                tenga el menos 1 elemento; es decir al menos 1 tarea

                */
                expect(wrapper.findAll('[data-test="todo-item"]')).toHaveLength(1);
                /* verificar que se agregue un item de las tareas y que sea Celebrar estudiado  */
                expect(wrapper.find('[data-test="todo-item"]').text()).toBe('Celebrar estudiando')
                //validar que una vez que se ingresó la tarea el input quedará vacío
                expect(input.element.value).toBe('');


            }

        )


    }
);


