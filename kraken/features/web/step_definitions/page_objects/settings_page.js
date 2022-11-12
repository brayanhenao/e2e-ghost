'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class SettingsPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToSettings() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/settings`);
	}

	async NavigateToGhost() {
		await this.driver.url(`${properties.GHOST_BASE_URL}`);
	}

	async ClickCodeInjectionFeature() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/settings/code-injection/`);
	}

	async FillInCodeInjectionEditor(code) {
		let codeInjectionEditorElement = await this.driver.$('.settings-code-editor');
		await codeInjectionEditorElement.click();
		let spanContentElement = await this.driver.$('span[role="presentation"]');
		await spanContentElement.setValue(code);
	}

	async CheckCustomHeader(headerText){
		let customHeaderElement = await this.driver.$('.custom-header');
		const customHeaderText = await customHeaderElement.getText();
		if (headerText === customHeaderText){
			return;
		}
		throw new Error(`Custom header ${headerText} is not in the ghost blog`);
	}

};