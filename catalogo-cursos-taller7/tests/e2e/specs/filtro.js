//Móviles
describe('Filtro de Productos',
  ()=>{
    it('Debe seleccionar solo los productos de la categoria seleccionada',
      ()=>{

        //visitar el directorio raiz
        cy.visit('/');
        /*esperar que la carga inicial termine
        obtiene(get) v-progress-circular donde debería(should) no existir(not.exist)
        */
        cy.get('.v-progress-circular').should('not.exist');

        //abrir el selector y seleccionaremos Móviles
        cy.get('.v-select').click(); //si clickeo y se abrió el selector
        /*
        accedemos a v-list-item y verificamos que contenga un elemento llamado
        Móviles y que sea clickeable.
        */
        cy.get('.v-list-item').contains('Móviles').click();

        //verificar los cards existentes pertecen a Móviles
        cy.get('.v-card').each(
          ($card)=>{
            cy.wrap($card).find('.v-chip').should('contain','Móviles');
          }
        )

      }
    )
  }
)
