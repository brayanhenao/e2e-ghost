Feature: Play game kahoot

  @user2 @web
  Scenario: My scenario 2
    Given I navigate to page "http://localhost:2368/ghost/#/signin"
    When I enter email "<EMAIL>"
    And I enter password "<PASSWORD>"
    And I wait for 2 seconds
    And I click login
    And I wait for 2 seconds
    Then I wait
