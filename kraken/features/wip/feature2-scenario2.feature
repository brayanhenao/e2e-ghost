Feature: List Posts

  @user1 @web
  Scenario: Filter posts in draft status
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds