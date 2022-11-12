Feature: Create Page

  @user1 @web
  Scenario: Create page and publish it
    Given I login into ghost admin console
    When I navigate to pages
    And I wait for 2 seconds
    And I click the create page button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC1"
    And I fill in the page title with "Title Page"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I take a screenshot for Feature "F4" and Scenario "SC1"
    And I wait for 1 seconds
    And I click the publish page button
    And I wait for 2 seconds
    And I click the continue publish page button
    And I wait for 2 seconds
    And I click the publish page now button
    And I wait for 2 seconds
    And I navigate to pages
    And I wait for 2 seconds
    And I take a screenshot for Feature "F4" and Scenario "SC1"
    Then I should see the page with title "Title Page" in the list of pages
