import {adminPage, pagesEditPage, pagesPage, pageDetailPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_page', () => {
	// before(cy.clearData);

	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	it('should create a page and publish it', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, true);

		cy.wait(1000);
		pagesPage.load();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		pageDetailPage.load();
		cy.wait(1000);
		pageDetailPage.contentContainer().contains(title).should('be.visible');
		pageDetailPage.contentContainer().contains(content).should('be.visible');
	});

	it('should create a page and let it draft', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content);

		cy.wait(1000);
		pagesPage.load();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
	});
	it('should create a page and schedule its publication', () => {
		const title = faker.lorem.words();
		const content = faker.lorem.paragraph();
		pagesPage.load();
		pagesPage.newPageButton().click();
		pagesEditPage.createPage(title, content, {scheduled: true});

		cy.wait(1000);
		pagesPage.load();
		cy.wait(1000);
		pagesPage.pageListContainer().contains(title).should('be.visible');

		pageDetailPage.setSlug(faker.helpers.slugify(title));
		cy.request({url: pageDetailPage.getUrl(), failOnStatusCode: false})
			.its('status')
			.should('equal', 404);
	});
});
