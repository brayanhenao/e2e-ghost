'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class PagePage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToPages() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/pages`);
	}

	async ClickCreatePageButton() {
		let createPostElement = await this.driver.$('a[href="#/editor/page/"]');
		await createPostElement.click();
	}

	async FillInTitle(title) {
		let titleElement = await this.driver.$('.gh-editor-title.ember-text-area');
		await titleElement.setValue(title);
	}

	async FillInDescription(content) {
		let titleElement = await this.driver.$(
			'.koenig-editor__editor.__mobiledoc-editor'
		);
		await titleElement.setValue(content);
	}

	async ClickPublishButton() {
		let publishElement = await this.driver.$('.gh-publish-trigger');
		await publishElement.click();
	}

	async ClickPublishContinueButton() {
		let publishContinueElement = await this.driver.$(
			'.gh-publish-cta > button'
		);
		await publishContinueElement.click();
	}

	async ClickRightNowButton() {
		let rightNowElement = await this.driver.$(
			'.gh-publish-setting.last > .gh-publish-setting-title'
		);
		await rightNowElement.click();
	}

	async ClickScheduleForLaterButton() {
		let rightNowElement = await this.driver.$(
			'.gh-publish-schedule > .gh-radio:not([class*="active"])'
		);
		await rightNowElement.click();
	}

	async FillInDateForLater(date) {
		let dateForLaterElement = await this.driver.$(
			'.gh-date-time-picker-date > input'
		);
		await dateForLaterElement.setValue(date);
	}

	async FillInTimeForLater(time) {
		let timeForLaterElement = await this.driver.$(
			'.gh-date-time-picker-time > input'
		);
		await timeForLaterElement.setValue(time);
	}

	async ClickPublishNowButton() {
		let publishNowElement = await this.driver.$(
			'.gh-btn.gh-btn-large.gh-btn-pulse.ember-view'
		);
		await publishNowElement.click();
	}

	async VerifyPageTitle(title) {
		let pagetTitleElements = await this.driver
			.$$(`.gh-content-entry-title`)
			.filter(async (element) => {
				let text = await element.getText();
				return text === title;
			});
		expect(pagetTitleElements.length).to.equal(1);
	}

	async VerifyPageTitleStatus(title, status) {
		let pageElements = await this.driver.$$(
			`.ember-view.permalink.gh-list-data.gh-post-list-title`
		);
		const arrayAux = [];
		for (const element of pageElements) {
			let pageTitle = await element.$('.gh-content-entry-title').getText();
			let pageStatus = await element.$('.gh-content-entry-status').getText();
			if (pageTitle === title && pageStatus === status) {
				arrayAux.push(element);
			}
		}
		expect(arrayAux.length).to.equal(1);
	}
};
