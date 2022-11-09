import {
	adminPage,
	dashboardPage,
	homePage,
	postsEditPage,
	postsPage,
} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_post', () => {
	beforeEach(() => {
		adminPage.load();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000);
		});
	});

	it('should create a post and publish it', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000);
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load();
		postsPage.publishedPostsOption().click();

		postsPage.postListContainer().contains(postTitle).should('be.visible');

		cy.wait(1000);

		homePage.load();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
	});
});
