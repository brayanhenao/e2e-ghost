import {
	adminPage,
	tagsPage,
	tagsEditPage,
	postsEditPage,
	postsPage,
} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_tag', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	it('should create a public tag', () => {
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

	it('should count total posts', () => {
		const tagName = faker.lorem.word();
		const totalPosts = faker.datatype.number(5);

		tagsPage.load();
		cy.wait(500);
		tagsPage.newTagButton().click();
		cy.wait(1000);
		tagsEditPage.nameInput().type(tagName);
		tagsEditPage.colorInput().type(faker.color.rgb({prefix: ''}));
		tagsEditPage.descriptionInput().type(faker.lorem.sentence());
		tagsEditPage.saveButton().click();
		cy.wait(1000);

		for (let i = 0; i < totalPosts; i++) {
			postsPage.load();
			cy.wait(500);
			postsPage.newPostsButton().click();

			cy.wait(1000);

			postsEditPage.settingsButton().click();
			postsEditPage.tagInput().type(`${tagName}{enter}`);
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(
				faker.lorem.word(),
				faker.lorem.paragraph(),
				true
			);
			cy.wait(1000);
		}

		tagsPage.load();
		cy.wait(1000);
		tagsPage
			.tagListContainer()
			.children()
			.contains(`${totalPosts} posts`)
			.should('be.visible');
	});
});