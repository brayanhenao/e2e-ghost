Feature: List Posts

  @user1 @web
  Scenario: Filter posts by publish date (oldest first)
    Given I tear down the data
    And I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "First Post Feature 2 Scenario 1"
    And I fill in the content with "First Content for Post Feature 2 Scenario 1"
    And I take a screenshot
    And I click the settings menu
    And I wait for 2 seconds
    And I change the publish date to "2022-01-01" and time to "01:00"
    And I take a screenshot
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "Second Post Feature 2 Scenario 1"
    And I fill in the content with "Second Content for Post Feature 2 Scenario 1"
    And I take a screenshot
    And I click the settings menu
    And I wait for 2 seconds
    And I change the publish date to "2018-01-01" and time to "01:00"
    And I take a screenshot
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "Third Post Feature 2 Scenario 1"
    And I fill in the content with "Third Content for Post Feature 2 Scenario 1"
    And I take a screenshot
    And I click the settings menu
    And I wait for 2 seconds
    And I change the publish date to "2020-01-01" and time to "01:00"
    And I take a screenshot
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot
    And I filter the posts published date by "Oldest First"