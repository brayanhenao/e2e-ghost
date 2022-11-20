import {
	adminPage,
	tagsPage,
	tagsEditPage,
	postsEditPage,
	postsPage,
} from '../../pages';

import {faker} from '@faker-js/faker';
faker.seed(666); //set seed to keep data consistent

describe('create_tag', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	it('should create a public tag', () => {
		const tagName = faker.lorem.word();
		tagsPage.load().screenshot();
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		tagsPage.load().screenshot();
		tagsPage.tagListContainer().contains(tagName).should('be.visible');
		cy.screenshot();
	});

	it('should count total posts', () => {
		const tagName = faker.lorem.word();
		const totalPosts = faker.datatype.number(5);

		tagsPage.load().screenshot();
		cy.wait(500);
		tagsPage.newTagButton().click();
		cy.wait(1000).screenshot();
		tagsEditPage.nameInput().type(tagName).screenshot();
		tagsEditPage
			.colorInput()
			.type(faker.color.rgb({prefix: ''}))
			.screenshot();
		tagsEditPage.descriptionInput().type(faker.lorem.sentence()).screenshot();
		tagsEditPage.saveButton().click();
		cy.wait(1000).screenshot();

		for (let i = 0; i < totalPosts; i++) {
			postsPage.load().screenshot();
			cy.wait(500);
			postsPage.newPostsButton().click();

			cy.wait(1000).screenshot();

			postsEditPage.settingsButton().click();
			postsEditPage.tagInput().type(`${tagName}{enter}`).screenshot();
			cy.wait(500);
			postsEditPage.settingsButton().click();

			postsEditPage.createPost(
				faker.lorem.word(),
				faker.lorem.paragraph(),
				true
			);
			cy.wait(1000);
		}

		tagsPage.load().screenshot();
		cy.wait(1000);
		tagsPage
			.tagListContainer()
			.children()
			.contains(`${totalPosts} posts`)
			.should('be.visible');
		cy.screenshot();
	});
});
