Feature: Create Post

  @user1 @web
  Scenario: Create a post and schedule the publish date
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
