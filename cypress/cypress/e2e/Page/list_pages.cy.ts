import {adminPage, pagesEditPage, pagesPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('list_pages', () => {
	let pageTitle,
		pageTitle2,
		pageTitle3 = '';

	before(() => {
		cy.clearData();
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});

		//draft
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle = faker.lorem.words();
		let content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle, content);
		cy.wait(1000);

		//published
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle2 = faker.lorem.words();
		content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle2, content, true);
		cy.wait(1000);

		//draft
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.newPageButton().click();
		cy.wait(1000);
		pageTitle3 = faker.lorem.words();
		content = faker.lorem.paragraph();
		pagesEditPage.createPage(pageTitle3, content, {scheduled: true});
		cy.wait(1000);

		adminPage.logout();
	});

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	it('should filter by draft', () => {
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.draftPageOption().click();
		cy.screenshot();

		pagesPage.pageListContainer().contains(pageTitle).should('be.visible');
		pagesPage.pageListContainer().contains(pageTitle2).should('not.exist');
		pagesPage.pageListContainer().contains(pageTitle3).should('not.exist');
	});
	it('should filter by published', () => {
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.selectPageStatus().click();
		cy.screenshot();
		cy.wait(500);
		pagesPage.publishedPageOption().click();
		cy.screenshot();

		pagesPage.pageListContainer().contains(pageTitle).should('not.exist');
		pagesPage.pageListContainer().contains(pageTitle2).should('be.visible');
		pagesPage.pageListContainer().contains(pageTitle3).should('not.exist');
	});
});
