import {adminPage, tagsPage, tagsEditPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_tag', () => {
	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	it('should list all created posts', () => {
		const tagName = faker.lorem.word();
		tagsPage.load();
		tagsPage.newTagButton().click();
		cy.wait(1000);
		tagsEditPage.nameInput().type(tagName);
		tagsEditPage.colorInput().type(faker.color.rgb({prefix: ''}));
		tagsEditPage.descriptionInput().type(faker.lorem.sentence());
		tagsEditPage.saveButton().click();
		cy.wait(1000);

		tagsPage.load();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
	});
});
