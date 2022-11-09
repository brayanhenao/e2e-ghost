const {When, Then, BeforeStep} = require('@cucumber/cucumber');
const expect = require('chai').expect;

Then('I see that the post is not liked', async function () {
	let elements = await this.driver.$$(
		"span[aria-label='See who reacted to this']"
	);
	expect(elements.length).to.equal(0);
});

When('I enter email {kraken-string}', async function (email) {
	let element = await this.driver.$('#ember6');
	return await element.setValue(email);
});

When('I enter password {kraken-string}', async function (password) {
	let element = await this.driver.$('#ember8');
	return await element.setValue(password);
});

When('I click login', async function () {
	let element = await this.driver.$('button[type="submit"]');
	return await element.click();
});

BeforeStep({}, async function () {
	let emailElement = await this.driver.$('#ember6');
	await emailElement.setValue(email);
	let passwordElement = await this.driver.$('#ember6');
	await passwordElement.setValue(email);
	let submitElement = await this.driver.$('button[type="submit"]');
	return await submitElement.click();
});

When('I go to test', async function () {
	let element = await this.driver.$(
		'div[data-functional-selector="my-kahoot-module__662a267d-c95a-4662-8d4a-12a28b9ba169__kahoot-card_title"]'
	);
	return await element.click();
});

When('I click play on test', async function () {
	let element = await this.driver.$(
		'button[data-functional-selector="play-button"]'
	);
	return await element.click();
});

When('I select teach mode', async function () {
	let element = await this.driver.$(
		'button[data-functional-selector="play-kahoot-dialog__host-live-game"]'
	);
	return await element.click();
});

When('I select classic mode', async function () {
	await this.driver.switchWindow(/play/);
	let element = await this.driver.$(
		'button[data-functional-selector="launch-button"]'
	);
	return await element.click();
});

When('I send game code to user {int}', async function (userId) {
	let codeParts = await this.driver.$$(
		'div[data-functional-selector="game-pin"] > div > div'
	);
	let codeStart = await codeParts[0].getText();
	let codeEnd = await codeParts[1].getText();
	let code = `${codeStart}${codeEnd}`;
	await this.driver.writeSignal(userId, code);
	return;
});

When('I click start', async function () {
	let element = await this.driver.$(
		'button[data-functional-selector="start-button"]'
	);
	return await element.click();
});

When('I click next', async function () {
	let element = await this.driver.$(
		'button[data-functional-selector="next-button"]'
	);
	return await element.click();
});

/* 
And I enter email "<EMAIL>"
        And I wait for 2 seconds
        And I enter password "<PASSWORD>"
        And I wait for 2 seconds
        And I click login
        And I wait
        And I go to test
        And I wait
        And I click play on test
        And I select teach mode
        And I wait
        And I select classic mode
        And I wait
        And I send game code to user 1
        And I wait
        And I wait for a signal containing "ready_to_start" for 120 seconds
        And I click start
        And I send a signal to user 1 containing "game_started"
        And I wait for a signal containing "finished" for 120 seconds
        And I click next

*/
