const rimraf = require('rimraf');
const {When, Given, Then, BeforeAll, Before} = require('@cucumber/cucumber');

const LoginPage = require('./page_objects/login_page.js');
const PostPage = require('./page_objects/post_page.js');
const TagPage = require('./page_objects/tag_page.js');
const MemberPage = require('./page_objects/member_page.js');
const PagePage = require('./page_objects/page_page.js');

const GhostAdminAPI = require('../../../utils/ghost_admin_api');
const path = require('path');
const fs = require('fs');

// Setup pages
const loginPage = new LoginPage(this.driver);
const postPage = new PostPage(this.driver);
const tagPage = new TagPage(this.driver);
const pagePage = new PagePage(this.driver);
const memberPage = new MemberPage(this.driver);

// Setup Utils
const ghostAdminAPI = new GhostAdminAPI();

// TearDown data in Ghost
BeforeAll(ghostAdminAPI.TearDown);

Before(async function() {
	// Delete all screenshots
	const screenshotDir = path.join(__dirname, '../../../screenshots');
	// Delete all directories in the screenshot directory
	if (fs.existsSync(screenshotDir)) {
		rimraf.sync(screenshotDir);
	}
});

// Common actions
When('I take a screenshot for Feature {string} and Scenario {string}', async function(feature, scenario) {
	const screnshotsDir = path.join(__dirname, '../../../screenshots');
	// check if screenshots directory exists
	if (!fs.existsSync(screnshotsDir)) {
		fs.mkdirSync(screnshotsDir);
	}

	// check if feature directory exists
	const featureDir = path.join(screnshotsDir, feature);
	if (!fs.existsSync(featureDir)) {
		fs.mkdirSync(featureDir);
	}

	const screenshotPath = path.join(featureDir, scenario + '_' + new Date().getTime() + '.png');
	await this.driver.saveScreenshot(screenshotPath);
});

// Login actions
Given('I login into ghost admin console', loginPage.EnterLoginCredentials);

// Post actions
When('I navigate to posts', postPage.NavigateToPosts);

When('I click the create posts button', postPage.ClickCreatePostButton);

When('I fill in the title with {string}', postPage.FillInTitle);

When('I fill in the content with {string}', postPage.FillInContent);

When('I click the publish button', postPage.ClickPublishButton);

When('I click the continue publish button', postPage.ClickPublishContinueButton);

When('I click the publish now button', postPage.ClickPublishNowButton);

When('I schedule post for later with date {string} and time {string}', postPage.SchedulePostForLater);

When('I click the settings menu', postPage.ClickSettingsMenu);

When('I click the post access combo box', postPage.ClickPostAccessComboBox);

When('I select the {string} option', postPage.SelectPostAccessOption);

When('I filter the posts access by {string}', postPage.FilterPostsByAccess);

When('I change the publish date to {string} and time to {string}', postPage.ChangePublishDateAndTime);

When('I filter the posts published date by {string}', postPage.FilterPostsByPublishedDate);

When('I filter the posts by status {string}', postPage.FilterPostsByStatus);

Then('I should see the post with title {string} in the list of posts', postPage.VerifyPostTitle);

Then('I should not see the post with title {string} in the list of posts', postPage.VerifyPostTitleNotPresent);

Then('I should see the post with title {string} in the list of posts with status {string}', postPage.VerifyPostTitleStatus);

Then('I should see the post with title {string} in the list of posts with scheduled date {string} and time {string}', postPage.VerifyPostTitleScheduledDate);

Then('I should see the post with title {string} with access {string} in the list of posts filtered by access', postPage.VerifyPostTitleAccess);

Then('I should see the post with title {string} in the position {int}', postPage.VerifyPostPosition);

Then('I should see the post with title {string} in the blog', postPage.VerifyPostInBlog);

Then('I should not see the post with title {string} in the blog', postPage.VerifyPostNotInBlog);

Then('I should have access only for {string}', postPage.VerifyPostAccessOnlyFor);


// Page actions
When('I navigate to pages', pagePage.NavigateToPages);

When('I click the create page button', pagePage.ClickCreatePageButton);

When('I fill in the page title with {string}', pagePage.FillInTitle);

When('I fill in the page content with {string}', pagePage.FillInDescription);

When('I click the publish page button', pagePage.ClickPublishButton);

When('I click the continue publish page button', pagePage.ClickPublishContinueButton);

When('I click the publish page now button', pagePage.ClickPublishNowButton);

When('I click the Right now page button', pagePage.ClickRightNowButton);

When('I click the Schedule For Later Button button', pagePage.ClickScheduleForLaterButton);

When('I fill in the date with {string}', pagePage.FillInDateForLater);

When('I fill in the time with {string}', pagePage.FillInTimeForLater);

Then('I should see the page with title {string} in the list of pages', pagePage.VerifyPageTitle);

Then('I should see the pages with title {string} in the list of pages with status {string}', pagePage.VerifyPageTitleStatus);

// List Pages
Then('I should see {int} number of pages with status {string}.', pagePage.VerifyNumberPageWithStatus);

When('I click the filter pages button', pagePage.ClickFilterPageButton);

When('I click the filter published pages button', pagePage.ClickFilterPublishedPageButton);

When('I click the filter draft pages button', pagePage.ClickFilterDrafPageButton);

Then('I should see the page with title {string} in the list of pages', pagePage.VerifyPageTitle);

Then('Then I should see the page with title {string} in the list of pages', pagePage.VerifyPageTitleStatus);

// Tag actions
When('I navigate to tags', tagPage.NavigateToTags);

When('I click the create tag button', tagPage.ClickCreateTagsButton);

When('I fill in the tag name with {string}', tagPage.FillInTitle);

When('I fill in the tag description with {string}', tagPage.FillInDescription);

When('I click the save tag button', tagPage.ClickSaveTagButton);

Then('I should see the tag with title {string} in the list of tags', tagPage.VerifyTagTitle);