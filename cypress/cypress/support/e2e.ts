// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')
import {adminPage, tagsPage, tagsEditPage} from '../pages';
import {baseUrl} from '../pages/basePage';

// Cypress.Commands.add('clearData', () => {
// 	cy.log('clearing all the data');
// 	adminPage.load();
//
// 	cy.fixture('admin').then(({user, password}) => {
// 		cy.log(user, password);
// 		adminPage.login(user, password);
// 		cy.wait(1000);
// 	});
//
// 	// clear tags
// 	cy.request(`${baseUrl}/ghost/api/admin/tags/?limit=all`).as('tags');
// 	cy.get<Cypress.Response<{tags: [{id: string}]}>>('@tags').then(($res) => {
// 		const tags = $res.body.tags;
// 		tags.forEach((tag) => {
// 			cy.log(tag.id);
// 			cy.request('DELETE', `${baseUrl}/ghost/api/admin/tags/${tag.id}/`).then(
// 				() => {}
// 			);
// 		});
// 	});
// 	// clear posts
// 	cy.request(`${baseUrl}/ghost/api/admin/posts/?limit=all`).as('posts');
// 	cy.get<Cypress.Response<{posts: [{id: string}]}>>('@posts').then(($res) => {
// 		const posts = $res.body.posts;
// 		posts.forEach((post) => {
// 			cy.log(post.id);
// 			cy.request('DELETE', `${baseUrl}/ghost/api/admin/posts/${post.id}/`).then(
// 				() => {}
// 			);
// 		});
// 	});
//
// 	// clear pages
// 	cy.request(`${baseUrl}/ghost/api/admin/pages/?limit=all`).as('pages');
// 	cy.get<Cypress.Response<{pages: [{id: string}]}>>('@pages').then(($res) => {
// 		const pages = $res.body.pages;
// 		pages.forEach((page) => {
// 			cy.log(page.id);
// 			cy.request('DELETE', `${baseUrl}/ghost/api/admin/pages/${page.id}/`).then(
// 				() => {}
// 			);
// 		});
// 	});
//
// 	// clear members
// 	cy.request(`${baseUrl}/ghost/api/admin/members/?limit=all`).as('members');
// 	cy.get<Cypress.Response<{members: [{id: string}]}>>('@members').then(
// 		($res) => {
// 			const members = $res.body.members;
// 			members.forEach((member) => {
// 				cy.log(member.id);
// 				cy.request(
// 					'DELETE',
// 					`${baseUrl}/ghost/api/admin/members/${member.id}/`
// 				).then(() => {});
// 			});
// 		}
// 	);
//
// 	cy.log('all data cleared');
// 	return adminPage.logout();
// });
