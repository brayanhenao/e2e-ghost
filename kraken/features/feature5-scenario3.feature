Feature: Create Page

  @user1 @web
  Scenario: Create page and schedule the publish date
    Given I login into ghost admin console
    When I navigate to pages
    And I wait for 2 seconds
    And I click the create page button
    And I wait for 2 seconds
    And I fill in the page title with "Post Feature 5 Scenario 3"
    And I fill in the page content with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 1 seconds
    And I click the publish page button
    And I click the Right now page button
    And I click the Schedule For Later Button button
    And I fill in the date with "2022-11-12"
    And I fill in the time with "04:25"
    And I wait for 1 seconds
    And I click the continue publish page button
    And I wait for 1 seconds
    And I click the publish page now button
    And I wait for 2 seconds
    And I navigate to pages
    Then I should see the pages with title "Post Feature 5 Scenario 3" in the list of pages with status "Scheduled"
    
