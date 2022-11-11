const {When, Given, Then, BeforeAll} = require('@cucumber/cucumber');

const LoginPage = require('./page_objects/login_page.js');
const PostPage = require('./page_objects/post_page.js');
const TagPage = require('./page_objects/tag_page.js');
const MemberPage = require('./page_objects/member_page.js');
const PagePage = require('./page_objects/page_page.js');

const GhostAdminAPI = require('../../../utils/ghost_admin_api');

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

// Common actions
When('I take a screenshot', async function() {
	await this.driver.saveScreenshot('./screenshot.png');
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

When('I filter the posts access by {string}', postPage.FilterPostsAccessBy);

When('I change the publish date to {string} and time to {string}', postPage.ChangePublishDateAndTime);

When('I filter the posts published date by {string}', postPage.FilterPostsPublishedDateBy);

Then('I should see the post with title {string} in the list of posts', postPage.VerifyPostTitle);

Then('I should see the post with title {string} in the list of posts with status {string}', postPage.VerifyPostTitleStatus);

Then('I should see the post with title {string} in the list of posts with scheduled date {string} and time {string}', postPage.VerifyPostTitleScheduledDate);

Then('I should see the post with title {string} with access {string} in the list of posts filtered by access', postPage.VerifyPostTitleAccess);

Then('I clean up the posts', postPage.DeleteAllPosts);

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

Then('I should see the page with title {string} in the list of pages',pagePage.VerifyPageTitle);


Then('I should see the pages with title {string} in the list of pages with status {string}',pagePage.VerifyPageTitleStatus);
// Tag actions
When('I navigate to tags', tagPage.NavigateToTags);
