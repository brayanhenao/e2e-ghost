Feature: Create Tag

  @user1 @web
  Scenario: Create a public tag and list it
    Given I login into ghost admin console
    When I navigate to tags
    And I wait for 2 seconds
    And I click the create tag button
    And I wait for 2 seconds
    And I fill in the tag name with "Title Page"
    And I fill in the tag description with "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae purus id purus pulvinar porta. Nulla tristique feugiat nibh at blandit. Pellentesque mattis rutrum felis, eu gravida nulla dictum eget. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas."
    And I wait for 1 seconds
    And I click the save tag button
    And I wait for 2 seconds
    And I navigate to tags
    And I wait for 2 seconds
    Then I should see the tag with title "Title Page" in the list of tags
