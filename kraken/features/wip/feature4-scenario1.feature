Feature: List Tags

  @user1 @web
  Scenario: List created tags
    Given I login into ghost admin console
    When I navigate to tags
    And I wait for 2 seconds
