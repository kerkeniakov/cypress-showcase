/// <reference types="Cypress" />
const pageContent = require('../../pageObjectModels/pageContent.js');
const searchWidget = require('../../pageObjectModels/searchWidget.js');
const pageNavigation = require('../../pageObjectModels/pageNavigation.js');

describe('Showcasing Cypress using the webdriver.io website -> focusing on keyword searches and data driven assertions', function () {
    it('1. Navigate to the WebdriverIO website at ' + Cypress.env("siteUrl"), function () {
        cy.visit(Cypress.env("siteUrl"));
    });
    it('2. Click on the \'API\' link in the top navigation bar ', function () {
        pageNavigation.headerNavOption('API').click();
    });
    it('3. Use the search functionality on this page to search their API documentation for the text "click"', function () {
        searchWidget.searchFor('click');
    });
    it('5. Validate search results -> that a with href of /docs/api/element/click/ is displayed', function () {
        searchWidget.expectSearchResult('/docs/api/element/click/', 'be.visible');
    });
    it('6. Validate search results -> match a source of type Element', function () {
       searchWidget.searchResultSource('element','be.visible');
    });
    it('7. Validate search results -> match a source of type Protocols', function () {
        
        searchWidget.searchResultSource('Protocols','be.visible');
    });
    it('8. Validate search results -> match a source of type API', function () {
        searchWidget.searchResultSource('API','exist');
    });
    it('9. Press enter to navigate to Click page from search results', function () {
        searchWidget.returnSearchModal().type('{enter}');
    });
    it('10. Validate that the current url is https://webdriver.io/docs/api/element/click/', function () {
        cy.url().should('eq', Cypress.env("siteUrl")+'/docs/api/element/click/');
    });
    it('11. Validate correct page headings text -> h1 "click" & h5 "examples"', function () {
        pageContent.returnHeading('h1', 'click').should('be.visible');
        pageContent.returnHeading('h5', 'Examples').should('be.visible');
    });
    it('12. Validate that Parameters table is rendereded / Name / Type / Details /', function () {
        pageContent.tableHeaderVisibility('Name','be.visible');
        pageContent.tableHeaderVisibility('Type','be.visible');
        pageContent.tableHeaderVisibility('Details','be.visible');
    });
    it('13. Validate that row data in Parameters table with "options","ClickOptions","click options (optional)" is displayed', function () {
        pageContent.parametersRowEntryIsDisplayed('options', 'ClickOptions', 'click options (optional)','be.visible');
    });
    it('14. Expand Protocols in the side navigation ', function () {
        pageNavigation.leftMenuOption('Protocols').click();
    });
    /**
     * Use data provider to verify that all sub-items/links of the Protocols tab have the correct name and href.
     * data provider is loaded from the specified json file from the ./fixtures folder
    **/
    it('16. Navigate to the WebdriverIO website at ' + Cypress.env("siteUrl"), function () {
        cy.fixture('sectionData').as('sectionData').then((sectionData)=>{
            Object.entries(sectionData).forEach(([sectionName,sectionHref]) =>{
                cy.xpath('//a[contains(@class,"menu__link")][text()="' + sectionName + '"]',{ timeout: 5000 }).should('be.visible');
                cy.xpath('//a[contains(@class,"menu__link")][text()="' + sectionName + '"]').invoke("attr","href").should("eq", sectionHref.href)
            });
        });
    });
});
