Feature: Create Post

  @user1 @web
  Scenario: Create a post and publish it
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "Post Feature 1 Scenario 1"
    And I wait for 2 seconds
    And I fill in the content with "Content for Post Feature 1 Scenario 1"
    And I wait for 2 seconds
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    Then I should see the post title "Post Feature 1 Scenario 1" in the list of posts
