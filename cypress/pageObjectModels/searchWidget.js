/**
 * Page object for Webdriver.io search widget.
**/
let searchWidget = function () {
    this.returnSearchModal = function () {
        return cy.xpath('//input[contains(@class, "DocSearch-Input")]')
    };

    this.returnSearchButton = function () {
        return cy.xpath('//button[contains(@class, "DocSearch-Button")]');
    };

    this.expectSearchModalVisible = function (visibility) {
        this.returnSearchModal().should(visibility);
    };

    this.searchFor = function (searchString) {
         this.returnSearchButton().click();
         this.returnSearchModal().should('be.visible');
         this.returnSearchModal().click();
         this.returnSearchModal().type(searchString,{delay:100});
    };

    this.expectSearchResult = function (href,visibility) {
        cy.xpath('//a[@href="' + href + '"]', { timeout: 5000 }).should(visibility);
    };

    this.addSearchToFavourites = function (href) {
        cy.xpath('//a[@href="' + href + '"]//button[@title="Save this search"]').click();
    };
    /**
     * The search widget can save previous searches in 2 sub-categories which we call sourceTag:
     * 1. Recent
     * 2. Favorites
     * @param sourceTag accepts either Recent/Favorites.
     * @param source this is the string of the search.
     * 
    **/
    this.returnSearchResultSource = function (sourceTag,source) {
        return cy.xpath('//div[@class="DocSearch-Hit-source" and contains(text(),"' + sourceTag + '")]//following::span[@class="DocSearch-Hit-title" and contains(text(),"' + source + '")]');
    };

    this.searchResultSource = function (source,visibility) {
        return cy.xpath('//div[@class="DocSearch-Hit-source" and contains(text(),"' + source + '")]',{ timeout: 5000 }).should(visibility);
    };
    
};
module.exports = new searchWidget();
