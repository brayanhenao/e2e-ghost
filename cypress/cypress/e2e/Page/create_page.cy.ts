import {adminPage, pagesEditPage, pagesPage, pageDetailPage} from '../../pages';

import {faker} from '@faker-js/faker';
faker.seed(666); //set seed to keep data consistent

describe.skip('create_page', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	it('should create a page and publish it', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, true);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		pageDetailPage.load().screenshot();
		cy.wait(1000);
		pageDetailPage.contentContainer().contains(title).should('be.visible');
		pageDetailPage.contentContainer().contains(content).should('be.visible');
		cy.screenshot();
	});

	it('should create a page and let it draft', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content);

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});
	it('should create a page and schedule its publication', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load().screenshot();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, {scheduled: true});

		cy.wait(1000).screenshot();
		pagesPage.load().screenshot();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
		cy.screenshot();
	});
});
