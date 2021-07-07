/**
 * Page object for Webdriver.io page content. Excludes header/footer/side navigation.
**/

let pageContent = function () {
    this.returnPageBody = function () {
        return cy.xpath('//body');
    };

    this.returnHeading = function (heading, string) {
        return cy.xpath(`//${heading}[contains(text(),"${string}")]`);
    };
    /**
    * Most pages in the documentation template have a table that lists reference materials relevant to the selected command.
    * 
    **/
    this.tableHeaderVisibility = function (tableHeaderName, visibility) {
        return cy.xpath(`//th[contains(text(),'${tableHeaderName}')]`, { timeout: 5000 }).should(visibility);
    }

    /**
     * Most pages in the documentation section follow a template that has a table which lists reference materials relevant to the selected command.
     * @param name refers to the entry under Name column.
     * @param type refers to the entry under Type column.
     * @param type refers to the entry under Details column.
     * 
    **/
    this.parametersRowEntryIsDisplayed = function (name, type, details,visibility) {
        cy.xpath('//var[text()="' + name + '"]', { timeout: 5000 }).should(visibility);
        cy.xpath('//var[text()="' + name + '"]//following::code[1]', { timeout: 5000 }).should(visibility);
        cy.xpath('//var[text()="' + name + '"]//following::td[2]', { timeout: 5000 }).should(visibility);
        cy.xpath('//var[text()="' + name + '"]//following::code[1]').invoke("text").should("eq", type)
        cy.xpath('//var[text()="' + name + '"]//following::td[2]').invoke("text").should("eq", details)
    }


};
module.exports = new pageContent();
