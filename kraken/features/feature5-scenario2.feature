Feature: List Pages

  @user1 @web
  Scenario: Filter pages in publish status
    Given I login into ghost admin console
    When I navigate to pages
    And I wait for 2 seconds
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I fill in the page title with "Title Page"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I wait for 1 seconds
    And I click the publish page button
    And I wait for 2 seconds
    And I click the continue publish page button
    And I wait for 2 seconds
    And I click the publish page now button
    And I wait for 2 seconds
    And I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I fill in the page title with "Post Feature 5 Scenario 2"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I wait for 1 seconds
    And I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I fill in the page title with "Title 2"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I wait for 1 seconds
    And I navigate to pages
    And I wait for 2 seconds
    And I click the filter pages button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    And I click the filter published pages button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F5" and Scenario "SC2"
    Then I should see 1 number of pages with status "Published".
