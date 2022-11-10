const {When, Given, Then, AfterAll} = require('@cucumber/cucumber');
const expect = require('chai').expect;

const LoginPage = require('./page_objects/login_page.js');
const PostPage = require('./page_objects/post_page.js');
const MemberPage = require('./page_objects/member_page.js');
const PagePage = require('./page_objects/page_page.js');

// Setup pages
const loginPage = new LoginPage(this.driver);
const postPage = new PostPage(this.driver);
const pagePage = new PagePage(this.driver);
const memberPage = new MemberPage(this.driver);


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

Then('I should see the post with title {string} in the list of posts', postPage.VerifyPostTitle);

Then('I should see the post with title {string} in the list of posts with status {string}', postPage.VerifyPostTitleStatus);

Then('I should see the post with title {string} in the list of posts with scheduled date {string} and time {string}', postPage.VerifyPostTitleScheduledDate);

Then('I should see the post with title {string} with access {string} in the list of posts filtered by access', postPage.VerifyPostTitleAccess);

Then('I clean up the posts', postPage.DeleteAllPosts);
