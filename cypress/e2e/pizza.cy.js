
describe('OrderPizzaE2ETest', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173/orderpizza')
  
    })
    describe('input', () => {
        it('passes', () => {
          cy.get('[data-testid="siparisNotu"]').type("workintech")
        })
      })
      describe('form submit', () => {
        it('passes', () => {
          cy.get('[data-testid="pepperoni"]').click()
          cy.get('[data-testid="kabak"]').click()
          cy.get('[data-testid="mısır"]').click()
          cy.get('[data-testid="biber"]').click()
          cy.get('[data-testid="select"]').select('Kalın')
          cy.get('[data-testid="Orta-radio"]').click()
          cy.get('[data-testid="inc-Button"]').click()
          cy.get('[data-testid="button"]').click();
          cy.get('[data-testid="select"]').should('have.value','Kalın')
          cy.url().should('eq', 'http://localhost:5173/success')
        })
      })
      describe('checkbox', () => {
        it('passes', () => {
          //Act
          cy.get('[data-testid="pepperoni"]').check()
          cy.get('[data-testid="kabak"]').check()
          cy.get('[data-testid="mısır"]').check()
          cy.get('[data-testid="biber"]').check()
          cy.get('[data-testid="pepperoni"]').should('be.checked').and('have.value', 'pepperoni')
          cy.get('[data-testid="kabak"]').should('be.checked').and('have.value', 'kabak')
          cy.get('[data-testid="mısır"]').should('be.checked').and('have.value', 'mısır')
          cy.get('[data-testid="biber"]').should('be.checked').and('have.value', 'biber')
        })
      })
})