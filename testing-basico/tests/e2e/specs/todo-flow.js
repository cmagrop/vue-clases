//cy es el objeto creado por cypress->herramienta para las pruebas e2e
describe('Flujo de tareas',
    ()=>{
        it('Debe permitir al usuario agregar agregar tareas',
            ()=>{
                //Visitar la aplicación 
                cy.visit('/')
                /*verificar el estado inicial
                get: obtener la etiqueta a validar 
                should: deberia
                be.visible: visible
                deberia ser visible
                and: y
                deberia contener(contain) el mensaje 'No hay tareas pendientes.'
                */
                cy.get('[data-test="empty-msg"]').should('be.visible')
                .and('contain','No hay tareas pendientes.')
                /*Agregar una tarea
                metodo type permite simular la escritura en el input
                click() es un método que permite verificar que el botón
                data-test="add-button sea clickeable
                */
                cy.get('[data-test="todo-input"]').type('Hoy es viernes chico')
                cy.get('[data-test="add-button"]').click()

                /*validar que se haya agregado un item 
                con el mensaje 'Hoy es viernes chico'
                should('have.length',1): debería tener un largo(array)
                de al menos 1 elemento(1 tarea)
                */
                cy.get('[data-test="todo-item"]').should('have.length',1)
                .and('contain','Hoy es viernes chico')

                //Finalización->verificar que el input se haya limpiado
                cy.get('[data-test="todo-input"]').should('have.value','')
                //should('have.value','')-> deberia tener un valor vacío



            }
        )
    }
)