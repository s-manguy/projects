module.exports = {
    contactFormVisibilityTest: function (client) {
        client
        .url('http://localhost:8000/')
        .waitForElementVisible('h1')
        .assert.titleEquals('Mon agence')
        .assert.textContains('h1', 'Agence lorem ipsum')
        .click('footer div small a') // opens a new tab
        // Switch to new tab
        .windowHandles(function (result) {
            // 0 == current main window, 1 == new tab
            var handle = result.value[1];
            client.switchToWindow(handle);
        })
        // do something on the new tab
        .waitForElementVisible('h1', 1000)
        .assert.urlEquals('https://grafikart.fr/formations/symfony-4-pratique')
        .assert.titleEquals("Formation Symfony 4 par l'exemple | Grafikart")
        // Close tab
        .closeWindow() 
        // Switch to main window
        .windowHandles(function (result) {
            // 0 == initial current main window, 1 == new tab
            var handle = result.value[0];
            client.switchToWindow(handle);
        })
        .end()
    }
}