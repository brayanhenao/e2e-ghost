Feature: Create Post

  @user1 @web
  Scenario: Create post, change post access to members only and publish it
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "Post Feature 1 Scenario 4"
    And I wait for 2 seconds
    And I fill in the content with "Content for Post Feature 1 Scenario 4"
    And I wait for 2 seconds
    And I click the settings menu
    And I wait for 2 seconds
    And I click the post access combo box
    And I wait for 2 seconds
    And I select the "members" option
    And I wait for 2 seconds
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    And I filter the posts access by "Members-only"
    And I wait for 2 seconds
    Then I should see the post with title "Post Feature 1 Scenario 4" in the list of posts
    And I clean up the posts
