import {adminPage, tagsPage, tagsEditPage} from '../../pages';

import {faker} from '@faker-js/faker';
faker.seed(666); //set seed to keep data consistent

describe.skip('list_tags', () => {
	let tagName,
		tagName2,
		tagName3 = '';

	before(() => {
		cy.clearData();

		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagName = faker.lorem.word();
		tagsPage.newTagButton().click();
		cy.screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagName2 = faker.lorem.word();
		tagsPage.newTagButton().click();
		cy.screenshot();
		tagsEditPage.nameInput().type(tagName2).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagName3 = faker.lorem.word();
		tagsPage.newTagButton().click();
		cy.screenshot();
		tagsEditPage.nameInput().type(tagName3).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		adminPage.logout();
	});

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	it('should list all created tags', () => {
		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		tagsPage.tagListContainer().contains(tagName2).should('be.visible');
		tagsPage.tagListContainer().contains(tagName3).should('be.visible');
		cy.screenshot();
	});
});
