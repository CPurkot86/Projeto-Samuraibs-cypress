

describe('Cadastro', function () {

    context('quando o suário é novato', function () {
        const user = {
            name: 'Cleverson Purkot',
            email: 'cleverson.purkot@yahoo.com.br',
            passwoard: 'Cypress123#$'
        }

        before(function () {
            //removendo o usuário para que a massa seja sempre válida
            cy.task('removeUser', user.email)
                .then(function (result) {
                    console.log(result)
                })
        })

        it('deve cadastrar com sucesso', function () {
            //acessando a página de cadastro
            cy.visit('/signup')

            //preenchendo e submetendo o formulário de cadastro
            cy.get('input[placeholder="Nome"]').type(user.name)
            cy.get('input[placeholder="E-mail"]').type(user.email)
            cy.get('input[placeholder="Senha"]').type(user.passwoard)

            cy.contains('button', 'Cadastrar').click()

            //validação do resultado esperado
            cy.get('.toast')
                .should('be.visible')
                .find('p')
                .should('have.text', 'Agora você se tornou um(a) Samurai, faça seu login para ver seus agendamentos!')
        })

        context('quando o email já existe', function () {
            const user = {
                name: 'Cleverson Purkot Teste',
                email: 'cleverson.purkot.5teste@yahoo.com.br',
                password: 'Cypress123#$',
                is_provider: true
            }

            before(function () {
                cy.task('removeUser', user.email)
                    .then(function (result) {
                        console.log(result)
                    })

                cy.request(
                    'POST',
                    'http://localhost:3333/users',
                    user
                ).then(function (response) {
                    expect(response.status).to.eq(200)
                })
            })

            it('não deve cadastrar o usuário', function () {

                cy.visit('/signup')

                cy.get('input[placeholder="Nome"]').type(user.name)
                cy.get('input[placeholder="E-mail"]').type(user.email)
                cy.get('input[placeholder="Senha"]').type(user.password)

                cy.contains('button', 'Cadastrar').click()

                cy.get('.toast')
                    .should('be.visible')
                    .find('p')
                    .should('have.text', 'Email já cadastrado para outro usuário.')
            })
        })
    })
})

