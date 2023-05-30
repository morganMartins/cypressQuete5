import { faker, th } from '@faker-js/faker';

describe('testMagento', () => {
  
  it('Accéder aux tops', () => {

    

    const lastName = faker.person.lastName();
    const firstName = faker.person.firstName();
    const email = faker.internet.email();
   
    cy.intercept({
        url:"https://magento.softwaretestingboard.com/customer/section/load/*",
        method:"GET",
    }).as('waitAddToCart');
    cy.intercept({
        url:"https://magento.softwaretestingboard.com/pub/static/version1678540400/frontend/Magento/luma/en_US/Magento_CheckoutAgreements/template/checkout/checkout-agreements.html",
        method:"GET",
    }).as('waitPayment');
    cy.intercept({
        url:"https://magento.softwaretestingboard.com/pub/static/version1678540400/frontend/Magento/luma/en_US/Magento_Checkout/template/progress-bar.html",
        method:"GET",
    }).as('waitShipping');
    cy.visit('https://magento.softwaretestingboard.com')

    /*cy.get('.panel > .header > .authorization-link > a').click()
    cy.wait(1000)
    cy.get('.login-container > .block-new-customer > .block-content > .actions-toolbar > div.primary > .action').click()
    cy.get('#firstname').type(firstName)
    cy.get('#lastname').type(lastName)
    cy.get('#email_address').type(email)
    cy.get('#password').type("12345AZazerrt!")
    cy.get('#password-confirmation').type("12345AZazerrt!")
    cy.get('#form-validate > .actions-toolbar > div.primary > .action').click()
    cy.wait(1000)*/

    cy.get('#ui-id-4 > .ui-menu-icon').trigger('mouseover')
    cy.get('#ui-id-9').click()
    cy.get(':nth-child(1) > .product-item-info > .photo > .product-image-container > .product-image-wrapper > .product-image-photo').click()
    cy.get('#option-label-size-143-item-167').click()
    cy.get('#option-label-color-93-item-57').click()
    cy.get('#product-addtocart-button').click()
    cy.wait("@waitAddToCart")
    cy.get('.showcart').click({force: true})
    cy.wait(1000)
    cy.get('[id^="cart-item-"][id$="-qty"]').clear().type(3)
    cy.get('#top-cart-btn-checkout').click()
    cy.wait("5000")
    cy.get('#top-cart-btn-checkout').click()
    cy.wait("@waitShipping")
    cy.get('#customer-email-fieldset > .required > .control > #customer-email').type(email); 
    cy.get('[name="firstname"]').type(firstName);
    cy.get('[name="lastname"]').type(lastName);
    cy.get('[name="company"]').type('SaucisseFactory');
    cy.get('[name="country_id"]').select('France');
    cy.get('[name="street[0]"]').type('1 avenue de la libération');
    cy.get('[name="city"]').type('Mérignac');
    cy.get('[name="region_id"]').select('Gironde');
    cy.get('[name="postcode"]').type('33700');
    cy.get('[name="telephone"]').type('0603435393');
    cy.get(':nth-child(1) > :nth-child(1) > .radio').check();
    cy.get('.button').click();

  })
})
