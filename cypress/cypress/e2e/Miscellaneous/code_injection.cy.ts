import {
	adminPage,
	codeInjectionPage,
	homePage,
	settingsPage,
} from '../../pages';

import {faker} from '@faker-js/faker';
faker.seed(666); //set seed to keep data consistent

describe('code_injection', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	afterEach(() => {
		// Not working
		// codeInjectionPage.load();
		// cy.wait(1000);
		// codeInjectionPage.siteHeaderTextArea().click();
		// cy.focused().clear({force: true});
		// cy.wait(1000);
		// codeInjectionPage.siteFooterTextArea().click();
		// cy.focused().clear({force: true});
		// cy.wait(1000);
		// codeInjectionPage.saveButton().click();
		// cy.wait(1000).screenshot();
	});

	it('should insert header', () => {
		const content = faker.hacker.phrase();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteHeaderTextArea()
			.type(`<div>${content}</div>`)
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});
	it('should insert footer', () => {
		const content = faker.hacker.phrase();
		codeInjectionPage.load();
		cy.wait(1000).screenshot();
		codeInjectionPage
			.siteFooterTextArea()
			.type(`<div>${content}</div>`)
			.screenshot();
		codeInjectionPage.saveButton().click();
		cy.wait(1000).screenshot();
		homePage.load().screenshot();
		cy.get('body').contains(content).should('be.visible');
		cy.screenshot();
	});
});
