import {
	adminPage,
	dashboardPage,
	homePage,
	postsEditPage,
	postsPage,
	postDetailPage,
} from '../../pages';

import {faker} from '@faker-js/faker';
faker.seed(666); //set seed to keep data consistent

describe('create_post', () => {
	before(cy.clearData);

	beforeEach(() => {
		adminPage.load().screenshot();
		cy.fixture('admin').then(({user, password}) => {
			cy.log(user, password);
			adminPage.login(user, password);
			cy.wait(1000).screenshot();
		});
	});

	it('should create a post and publish it', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('be.visible');
		cy.screenshot();
	});

	it('should create a post and leave it draft', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();
	});

	it('should create a post and schedule its publication', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		postsEditPage.createPost(postTitle, postContent, {scheduled: true});
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');
		postsPage.scheduledPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');

		cy.wait(1000);

		homePage.load().screenshot();
		cy.wait(1000);

		homePage.feedContainer().contains(postTitle).should('not.exist');
		cy.screenshot();
	});
	it('should create a post and change the access to members only', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('members');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

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
		cy.screenshot();
	});
	it('should create a post and change the access to paid members only', () => {
		dashboardPage.postsOption().click();
		cy.wait(1000).screenshot();
		const postTitle = faker.lorem.words();
		const postContent = faker.lorem.paragraphs();
		postsPage.newPostsButton().click();
		cy.screenshot();
		cy.wait(1000);
		postsEditPage.settingsButton().click();
		postsEditPage.settingsPostAccessSelect().select('paid');
		cy.wait(500);
		postsEditPage.settingsButton().click();

		postsEditPage.createPost(postTitle, postContent, true);
		cy.wait(1000);

		postsPage.load().screenshot();

		postsPage.publishedPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('be.visible');
		cy.wait(1000);
		postsPage.draftPostsOption().click();
		postsPage
			.postListContainer()
			.screenshot()
			.contains(postTitle)
			.should('not.exist');

		cy.wait(1000);

		homePage.load().screenshot();

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
		cy.screenshot();
	});
});
