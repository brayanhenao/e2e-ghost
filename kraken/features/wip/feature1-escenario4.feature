Feature: Create Post

  @user1 @web
  Scenario: Create post and change post access to members only
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
