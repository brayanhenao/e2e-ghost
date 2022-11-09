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
};