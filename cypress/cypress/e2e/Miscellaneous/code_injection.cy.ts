import {
	adminPage,
	codeInjectionPage,
	homePage,
	settingsPage,
} from '../../pages';

import {faker} from '@faker-js/faker';

describe('code_injection', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	afterEach(() => {
		codeInjectionPage.load();
		cy.wait(1000);
		codeInjectionPage.siteHeaderTextArea().click();
		cy.focused().clear({force: true});
		cy.wait(1000);
		codeInjectionPage.siteFooterTextArea().click();
		cy.focused().clear({force: true});
		cy.wait(1000);
		codeInjectionPage.saveButton().click();
		cy.wait(1000);
	});

	it('should insert header', () => {
		const content = faker.hacker.phrase();
		settingsPage.load();
		settingsPage.codeInjectionButton().click();
		cy.wait(1000);
		codeInjectionPage.siteHeaderTextArea().type(`<div>${content}</div>`);
		codeInjectionPage.saveButton().click();
		cy.wait(1000);
		homePage.load();
		cy.get('body').contains(content).should('be.visible');
	});
	it('should insert footer', () => {
		const content = faker.hacker.phrase();
		settingsPage.load();
		settingsPage.codeInjectionButton().click();
		cy.wait(1000);
		codeInjectionPage.siteFooterTextArea().type(`<div>${content}</div>`);
		codeInjectionPage.saveButton().click();
		cy.wait(1000);
		homePage.load();
		cy.get('body').contains(content).should('be.visible');
	});
});
