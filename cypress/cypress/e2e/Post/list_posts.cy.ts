import {adminPage, postsEditPage, postsPage} from '../../pages';

import {faker} from '@faker-js/faker';

describe('list_post', () => {
	context('filter', () => {
		let postTitle,
			postTitle2,
			postTitle3 = '';

		before(() => {
			cy.clearData();

			adminPage.load();
			cy.fixture('admin').then(({user, password}) => {
				cy.log(user, password);
				adminPage.login(user, password);
				cy.wait(1000);
			});

			//draft
			postsPage.load();
			cy.wait(1000);
			postTitle = faker.lorem.words();
			const postContent = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle, postContent);
			cy.wait(1000);

			//published
			postsPage.load();
			cy.wait(1000);
			postTitle2 = faker.lorem.words();
			const postContent2 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			//scheduled
			postsPage.load();
			cy.wait(1000);
			postTitle3 = faker.lorem.words();
			const postContent3 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle3, postContent3, {scheduled: true});
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

		it('should list all created posts', () => {
			postsPage.load();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('be.visible');
			postsPage.postListContainer().contains(postTitle3).should('be.visible');
		});

		it('should filter posts by status - draft', () => {
			postsPage.load();
			cy.wait(1000);
			postsPage.selectPostStatus().click();
			postsPage.draftPostOption().click();
			postsPage.postListContainer().contains(postTitle).should('be.visible');
			postsPage.postListContainer().contains(postTitle2).should('not.exist');
			postsPage.postListContainer().contains(postTitle3).should('not.exist');
		});
	});

	context('sort', () => {
		let postTitle,
			postTitle2,
			postTitle3 = '';

		before(() => {
			cy.clearData();

			adminPage.load();
			cy.fixture('admin').then(({user, password}) => {
				cy.log(user, password);
				adminPage.login(user, password);
				cy.wait(1000);
			});

			postsPage.load();
			cy.wait(1000);
			postTitle = faker.lorem.words();
			const postContent = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle, postContent, true);
			cy.wait(1000);

			postsPage.load();
			cy.wait(1000);
			postTitle2 = faker.lorem.words();
			const postContent2 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle2, postContent2, true);
			cy.wait(1000);

			postsPage.load();
			cy.wait(1000);
			postTitle3 = faker.lorem.words();
			const postContent3 = faker.lorem.paragraphs();
			postsPage.newPostsButton().click();
			postsEditPage.createPost(postTitle3, postContent3, true);
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

		it('should sort post by publish date  - oldest first ', () => {
			postsPage.load();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			postsPage.oldestFirstOption().click();
			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle : i == 1 ? postTitle2 : postTitle3)
						.should('be.visible');
				});
		});
		it('should sort post by publish date  - newest first ', () => {
			postsPage.load();
			cy.wait(1000);
			postsPage.selectSortDate().click();
			postsPage.newestFirstOption().click();
			postsPage
				.postListContainer()
				.children()
				.each(($child, i) => {
					cy.wrap($child)
						.contains(i == 0 ? postTitle3 : i == 1 ? postTitle2 : postTitle)
						.should('be.visible');
				});
		});
	});
});