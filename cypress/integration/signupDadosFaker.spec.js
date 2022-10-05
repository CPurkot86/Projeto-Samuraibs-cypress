

//https://fakerjs.dev/ gerar massa de dados Fake
import { faker } from '@faker-js/faker'

//Preenchendo o formulário de cadastro + cadastrar
it('deve cadastrar um novo usuário', function () {

    const name = 'Cleverson Purkot'
    const email = faker.internet.email() // Com os métodos “faker.name.fullName()“ e “faker.internet.password()“ podemos gerar nomes e senhas dinâmicos também.
    const passwoard = 'Cypress123#$'

    cy.visit('/signup')

    cy.get('input[placeholder="Nome"]').type(name)
    cy.get('input[placeholder="E-mail"]').type(email)
    cy.get('input[placeholder="Senha"]').type(passwoard)

    cy.contains('button', 'Cadastrar').click()

    cy.get('.toast')
        .should('be.visible')
        .find('p')
        .should('have.text', 'Agora você pode fazer seu login no Samurai Barbershop!')

})