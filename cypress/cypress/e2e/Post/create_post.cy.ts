import {
	adminPage,
	dashboardPage,
	homePage,
	postsEditPage,
	postsPage,
	postDetailPage,
} from '../../pages';

import {faker} from '@faker-js/faker';

describe('create_post', () => {
	before(cy.clearData);

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
		postsPage.draftPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('not.exist');

		cy.wait(1000);

		homePage.load();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
	});

	it('should create a post and leave it draft', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000);
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		postsEditPage.createPost(postTitle, postContent);
		cy.wait(1000);

		postsPage.load();

		postsPage.publishedPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('be.visible');

		cy.wait(1000);

		homePage.load();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
	});

	it('should create a post and schedule its publication', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000);
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		postsEditPage.createPost(postTitle, postContent, {scheduled: true});
		cy.wait(1000);

		postsPage.load();

		postsPage.publishedPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('not.exist');
		postsPage.scheduledPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('be.visible');

		cy.wait(1000);

		homePage.load();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
	});
	it('should create a post and change the access to members only', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000);
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('members');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load();

		postsPage.publishedPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('not.exist');

		cy.wait(1000);

		homePage.load();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({subscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(subscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
	});
	it('should create a post and change the access to paid members only', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000);
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('paid');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load();

		postsPage.publishedPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage.postListContainer().contains(postTitle).should('not.exist');

		cy.wait(1000);

		homePage.load();

		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible').click();

		cy.fixture('messages').then(({paidSubscribersOnly}) => {
			postDetailPage
				.contentContainer()
				.contains(paidSubscribersOnly)
				.should('be.visible');
			postDetailPage
				.contentContainer()
				.contains(postContent)
				.should('not.exist');
		});
	});
});
