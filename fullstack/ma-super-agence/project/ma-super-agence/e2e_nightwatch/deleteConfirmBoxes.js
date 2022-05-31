let loginNavLink = 'nav div ul li + li a';
let deleteButton = 'table tbody td+td form button'
module.exports = {
    
    deleteConfirmBoxes: function (client) {
        client
        // enter the website
        .url('http://localhost:8000')
        .waitForElementVisible('h1')
        .assert.titleEquals('Mon agence')
        // log in
        .assert.textContains(loginNavLink, 'Se connecter')
        .click(loginNavLink)
        .waitForElementVisible('form')
        .assert.titleEquals('Se connecter')
        .assert.hasClass(loginNavLink, 'nav-link active')
        .setValue('#username', 'demo')
        .setValue('#password', 'demo')
        .click('button[type="submit"]')
        .waitForElementVisible('h1')
        .assert.titleEquals('Mon agence')
        .assert.urlEquals('http://localhost:8000/')
        .assert.textContains(loginNavLink, 'Se déconnecter')
        // go to admin & try to delete a property
        .url('http://localhost:8000/admin')
        .waitForElementVisible('h1')
        .assert.titleEquals('Gérer les biens')
        .assert.textContains(loginNavLink, 'Se déconnecter')
        .assert.textContains('h1', 'Gérer les biens')
        .assert.textContains(deleteButton, 'Supprimer')
        .click(deleteButton)
        // cancel the delete action
        .dismissAlert()
        // go to the option admin & try to delete an option
        .url('http://localhost:8000/admin/option/')
        .waitForElementVisible('h1')
        .assert.titleEquals('Gérer les options')
        .assert.textContains(loginNavLink, 'Se déconnecter')
        .assert.textContains('h1', 'Gérer les options')
        .assert.textContains(deleteButton, 'Supprimer')
        .click(deleteButton)
        // cancel the delete action
        .dismissAlert()
        // log out
        .url('http://localhost:8000/admin')
        .waitForElementVisible('h1')
        .assert.titleEquals('Gérer les biens')
        .assert.textContains(loginNavLink, 'Se déconnecter')
        .click(loginNavLink)
        .waitForElementVisible('h1')
        .assert.urlEquals('http://localhost:8000/')
        .assert.titleEquals('Mon agence')
        .assert.not.textContains(loginNavLink, 'Se déconnecter')
        .assert.textContains(loginNavLink, 'Se connecter')
        .end()
    }
}