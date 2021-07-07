/// <reference types="Cypress" />
const pageContent = require('../../pageObjectModels/pageContent.js');
const searchWidget = require('../../pageObjectModels/searchWidget.js');

describe('Showcasing Cypress demo framework to test webdriver.io Search widget hotkeys/search history and favourites', function () {
    it('1. Navigate to the WebdriverIO website at ' + Cypress.env("siteUrl"), function () {
        cy.visit(Cypress.env("siteUrl"));
    });
    it('2. Press CTRL+K to bring up the search widget modal', function () {
        pageContent.returnPageBody().type('{ctrl+k}');
    });
    it('3. Validate that the search widget modal is visible', function () {
        searchWidget.expectSearchModalVisible('be.visible');
    });
    it('5. Press escape to close the search widget modal', function () {
        searchWidget.returnSearchModal().type('{esc}')
    });
    it('6. Validate that the search widget modal is NOT visible', function () {
        searchWidget.expectSearchModalVisible('not.exist');
    });
    it('7. Search for addValue keyword', function () {
        searchWidget.searchFor('addValue');
        searchWidget.expectSearchResult('/docs/api/element/addValue/', 'be.visible');
        searchWidget.returnSearchModal().type('{enter}')
    });
    it('8. Press CTRL+K to bring up the search widget modal', function () {
        searchWidget.returnSearchButton().click();
    });
    it('9. Validate that addValue is in recent search history', function () {
        searchWidget.returnSearchResultSource('Recent','addValue').should('be.visible');
    });
    it('10. Add addValue to favourites', function () {
        searchWidget.addSearchToFavourites('/docs/api/element/addValue/');
    });
    it('10. Validate that addValue is saved in Favorites', function () {
        searchWidget.returnSearchResultSource('Favorites','addValue').should('be.visible');
    });
});
