Feature: Create Post

  @user1 @web
  Scenario: Create post, change post access to members only and publish it
    When I login into ghost admin console
    And I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    And I fill in the title with "Post Feature 1 Scenario 4"
    And I fill in the content with "Content for Post Feature 1 Scenario 4"
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    And I click the settings menu
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    And I click the post access combo box
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    And I select the "members" option
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    And I filter the posts access by "Members-only"
    And I wait for 2 seconds
    And I take a screenshot for Feature "F1" and Scenario "SC4"
    Then I should see the post with title "Post Feature 1 Scenario 4" in the list of posts
    And I should see the post with title "Post Feature 1 Scenario 4" in the blog
    And I should have access only for "subscribers"
