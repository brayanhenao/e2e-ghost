'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class PostPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToPosts() {
		await this.driver.url(`http://localhost:${properties.GHOST_PORT}/ghost/#/posts`);
	}

	async ClickCreatePostButton() {
		let createPostElement = await this.driver.$('a[href="#/editor/post/"]');
		await createPostElement.click();
	}

	async FillInTitle(title) {
		let titleElement = await this.driver.$('.gh-editor-title.ember-text-area');
		await titleElement.setValue(title);
	}

	async FillInContent(content) {
		let titleElement = await this.driver.$('.koenig-editor__editor.__mobiledoc-editor');
		await titleElement.setValue(content);
	}

	async ClickPublishButton() {
		let publishElement = await this.driver.$('.gh-publish-trigger');
		await publishElement.click();
	}

	async ClickPublishContinueButton() {
		let publishContinueElement = await this.driver.$('span=Continue, final review →');
		await publishContinueElement.click();
	}

	async ClickPublishNowButton() {
		let publishNowElement = await this.driver.$('span=Publish post, right now');
		await publishNowElement.click();
	}

	async VerifyPostTitle(title) {
		let postTitleElements = await this.driver.$$(`.gh-content-entry-title`).filter(async (element) => {
			let text = await element.getText();
			return text === title;
		});
		expect(postTitleElements.length).to.equal(1);
	}

	async VerifyPostTitleStatus(title, status) {
		let postElement = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		for (const element of postElement) {
			let postTitle = await element.$('.gh-content-entry-title').getText();
			let postStatus = await element.$('.gh-content-entry-status').getText();
			if (postTitle === title && postStatus === status) {
				return;
			}
		}

		throw new Error(`Post with title ${title} and status ${status} not found`);
	}

	async DeleteAllPosts() {
		let postElements = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`).map(async (element) => {
			let status = await element.$('.gh-content-entry-status').getText();
			return {element, status};
		});

		for (let i = 0; i < postElements.length; i++) {
			let postElement = postElements[i].element;
			let postStatus = postElements[i].status;

			await postElement.click();
			await new Promise(r => setTimeout(r, 1000));
			if (postStatus !== 'Draft') {
				let editPostElement = await this.driver.$('.gh-post-list-cta.edit');
				await editPostElement.click();
				await new Promise(r => setTimeout(r, 1000));
			}

			let settingsElement = await this.driver.$('.settings-menu-toggle');
			await settingsElement.click();

			let deleteButton = await this.driver.$('.settings-menu-delete-button');
			await deleteButton.click();
			await new Promise(r => setTimeout(r, 1000));

			let confirmDeleteElement = await this.driver.$('span=Delete');
			await confirmDeleteElement.click();
			await new Promise(r => setTimeout(r, 1000));
			await this.driver.url(`http://localhost:${properties.GHOST_PORT}/ghost/#/posts`);
			await new Promise(r => setTimeout(r, 1000));
		}
	}
};