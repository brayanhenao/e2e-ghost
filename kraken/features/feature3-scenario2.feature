Feature: Create Tag

  @user1 @web
  Scenario: Create an internal tag, assign it to 3 posts, verify the post count in the list
    Given I login into ghost admin console
    When I navigate to tags
    And I wait for 2 seconds
    And I click the create tag button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I fill in the tag name with "Tag Test"
    And I fill in the tag description with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I wait for 1 seconds
    And I click the save tag button
    And I wait for 2 seconds
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I fill in the title with "First Post Feature 3 Scenario 2"
    And I fill in the content with "Content for First Post Feature 3 Scenario 2"
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I wait for 2 seconds
    And I click the settings menu
    And I fill the tag select with "Tag Test"
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I click the select tag
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I fill in the title with "Second Post Feature 3 Scenario 2"
    And I fill in the content with "Content for Second Post Feature 3 Scenario 2"
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I wait for 2 seconds
    And I click the settings menu
    And I fill the tag select with "Tag Test"
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I click the select tag
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I fill in the title with "Third Post Feature 3 Scenario 2"
    And I fill in the content with "Content for Third Post Feature 3 Scenario 2"
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I wait for 2 seconds
    And I click the settings menu
    And I fill the tag select with "Tag Test"
    And I click the select tag
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I wait for 2 seconds
    And I navigate to posts
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    And I navigate to tags
    And I wait for 2 seconds
    And I take a screenshot for Feature "F3" and Scenario "SC2"
    Then I should see the tag with name "Tag Test" and 3 post in the list of tags