'use strict';

const properties = require('../../../../properties.json');

module.exports = class LoginPage {

	constructor(driver) {
		this.driver = driver;
	}

	async EnterLoginCredentials() {
		await this.driver.url(`http://localhost:${properties.GHOST_PORT}/ghost/#/signin`);
		let emailElement = await this.driver.$('input[name="identification"]');
		await emailElement.setValue(properties.EMAIL);
		await new Promise(r => setTimeout(r, 1000));

		let passwordElement = await this.driver.$('input[name="password"]');
		await passwordElement.setValue(properties.PASSWORD);
		await new Promise(r => setTimeout(r, 1000));

		this.driver.takeScreenshot();

		let submitElement = await this.driver.$('button[type="submit"]');
		await submitElement.click();

		return new Promise(r => setTimeout(r, 5000));
	}
};