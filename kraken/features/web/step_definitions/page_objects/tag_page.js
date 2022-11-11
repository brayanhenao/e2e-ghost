'use strict';

const properties = require('../../../../properties.json');
const {expect} = require('chai');

module.exports = class TagPage {
	constructor(driver) {
		this.driver = driver;
	}

	async NavigateToTags() {
		await this.driver.url(`${properties.GHOST_BASE_URL}/ghost/#/tags`);
	}
};