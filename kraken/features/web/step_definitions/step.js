const {When, Then, BeforeStep, Given} = require('@cucumber/cucumber');
const expect = require('chai').expect;
const properties = require('../../../properties.json');

BeforeStep({}, async function() {
	this.driver.url(`http://localhost:${properties.GHOST_PORT}/ghost/#/signin`);
	let emailElement = await this.driver.$('#ember6');
	await emailElement.setValue(properties.EMAIL);
	await new Promise(r => setTimeout(r, 1000));

	let passwordElement = await this.driver.$('#ember8');
	await passwordElement.setValue(properties.PASSWORD);
	await new Promise(r => setTimeout(r, 1000));

	this.driver.takeScreenshot();

	let submitElement = await this.driver.$('button[type="submit"]');
	await submitElement.click();

	return new Promise(r => setTimeout(r, 3000));
});

Given('I go to posts', async function() {
	await this.driver.url('http://localhost:2368/posts');
});
