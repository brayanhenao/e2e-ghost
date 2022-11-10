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

Then('I should see the post with title {string} in the list of posts', postPage.VerifyPostTitle);

Then('I should see the post with title {string} in the list of posts with status {string}', postPage.VerifyPostTitleStatus);

Then('I clean up the posts', postPage.DeleteAllPosts);