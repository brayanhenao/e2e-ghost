Feature: Create Post

  @user1 @web
  Scenario: Create a post and leave it in draft
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
