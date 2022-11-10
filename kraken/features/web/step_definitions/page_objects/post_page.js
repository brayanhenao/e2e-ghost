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
		let publishNowElement = await this.driver.$('.gh-btn.gh-btn-large.gh-btn-pulse.ember-view');
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
			console.log(`Deleting post with status ${postStatus}`);
			if (postStatus === 'Published') {
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

	async SchedulePostForLater(date, time) {
		let publishDateElement = await this.driver.$('.gh-publish-setting.last');
		await publishDateElement.click();
		await new Promise(r => setTimeout(r, 1000));

		// click radio button with label "Schedule for later"
		let scheduleForLaterElement = await this.driver.$('label=Schedule for later');
		await scheduleForLaterElement.click();
		await new Promise(r => setTimeout(r, 1000));

		let datePickerInput = await this.driver.$('.gh-date-time-picker-date > input');
		await datePickerInput.setValue(date);
		await new Promise(r => setTimeout(r, 1000));

		let timePickerInput = await this.driver.$('.gh-date-time-picker-time > input');
		await timePickerInput.setValue(time);
		await new Promise(r => setTimeout(r, 1000));
	}

	async VerifyPostTitleScheduledDate(title, date, time) {
		let postElement = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		for (const element of postElement) {
			let postTitle = await element.$('.gh-content-entry-title').getText();

			let postStatusElement = await element.$('.gh-content-entry-status');

			await postStatusElement.moveTo();
			await new Promise(r => setTimeout(r, 1000));
			let postScheduledDate = await element.$('.schedule-details').getText();

			let postScheduledDateFormatted = postScheduledDate.split('on ')[1].split(' to')[0].split(' ').join('-') + ' ' + postScheduledDate.split('at ')[1].split(' (')[0];
			let auxDate = new Date(postScheduledDateFormatted + ' UTC');
			postScheduledDateFormatted = auxDate.toISOString().slice(0, 16).replace('T', ' ');
			console.log(postScheduledDateFormatted);

			if (postTitle === title && postScheduledDateFormatted === `${date} ${time}`) {
				return;
			}
		}

		throw new Error(`Post with title ${title} and date ${date} ${time} not found`);
	}

	async ClickSettingsMenu() {
		let settingsMenuElement = await this.driver.$('.settings-menu-toggle');
		await settingsMenuElement.click();
	}

	async ClickPostAccessComboBox() {
		let postAccessComboBoxElement = await this.driver.$('.gh-select');
		await postAccessComboBoxElement.click();
	}

	async SelectPostAccessOption(option) {
		let postAccessOptionElement = await this.driver.$(`option[value="${option}"]`);
		await postAccessOptionElement.click();
	}

	async FilterPostsAccessBy(option) {
		let postAccessFilterElement = await this.driver.$('.gh-contentfilter-menu.gh-contentfilter-visibility');
		await postAccessFilterElement.click();

		let postAccessFilterOptionElement = await this.driver.$$(`.ember-power-select-option`).filter(async (element) => {
			let text = await element.getText();
			console.log(text);
			return text === option;
		});

		console.log(postAccessFilterOptionElement);

		await postAccessFilterOptionElement[0].click();
	}

	async VerifyPostTitleAccess(title, accessOption) {
		let postElement = await this.driver.$$(`.ember-view.permalink.gh-list-data.gh-post-list-title`);
		for (const element of postElement) {
			let postTitle = await element.$('.gh-content-entry-title').getText();
			let postAccess = await element.$('.gh-content-entry-access').getText();
			if (postTitle === title && postAccess === accessOption) {
				return;
			}
		}

		throw new Error(`Post with title ${title} and access ${accessOption} not found`);
	}
};