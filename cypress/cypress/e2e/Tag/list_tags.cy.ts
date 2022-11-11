import {adminPage, tagsPage, tagsEditPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('list_tags', () => {
	let tagName,
		tagName2,
		tagName3 = '';

	before(() => {
		cy.clearData();

		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});

		tagsPage.load();
		cy.wait(1000);
		tagName = faker.lorem.word();
		tagsPage.newTagButton().click();
		tagsEditPage.nameInput().type(tagName);
		tagsEditPage.colorInput().type(faker.color.rgb({prefix: ''}));
		tagsEditPage.descriptionInput().type(faker.lorem.sentence());
		tagsEditPage.saveButton().click();
		cy.wait(1000);

		tagsPage.load();
		cy.wait(1000);
		tagName2 = faker.lorem.word();
		tagsPage.newTagButton().click();
		tagsEditPage.nameInput().type(tagName2);
		tagsEditPage.colorInput().type(faker.color.rgb({prefix: ''}));
		tagsEditPage.descriptionInput().type(faker.lorem.sentence());
		tagsEditPage.saveButton().click();
		cy.wait(1000);

		tagsPage.load();
		cy.wait(1000);
		tagName3 = faker.lorem.word();
		tagsPage.newTagButton().click();
		tagsEditPage.nameInput().type(tagName3);
		tagsEditPage.colorInput().type(faker.color.rgb({prefix: ''}));
		tagsEditPage.descriptionInput().type(faker.lorem.sentence());
		tagsEditPage.saveButton().click();
		cy.wait(1000);

		adminPage.logout();
	});

	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	it('should list all created tags', () => {
		tagsPage.load();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		tagsPage.tagListContainer().contains(tagName2).should('be.visible');
		tagsPage.tagListContainer().contains(tagName3).should('be.visible');
	});
});
