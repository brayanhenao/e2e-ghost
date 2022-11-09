Feature: Create Post

  @user1 @web
  Scenario: Create a post and preview it on mobile
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
