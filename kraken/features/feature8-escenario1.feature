Feature: Create Post

  @user1 @web
  Scenario: Create 3 members and filter them by name
    Given I login into ghost admin console
    When I navigate to members
    And I wait for 2 seconds
    And I click the create New member button
    And I wait for 2 seconds
    And I fill in the Name with "Member A"
    And I wait for 2 seconds
    And I fill in the email with "membera@mail.com"
    And I wait for 2 seconds
    And I click the save button
    And I wait for 2 seconds
    And I navigate to members
    And I wait for 2 seconds
    And I click the create New member button
    And I wait for 2 seconds
    And I fill in the Name with "Member B"
    And I wait for 2 seconds
    And I fill in the email with "memberb@mail.com"
    And I wait for 2 seconds
    And I click the save button
    And I wait for 2 seconds
    And I navigate to members
    And I wait for 2 seconds
    And I click the create New member button
    And I wait for 2 seconds
    And I fill in the Name with "Member C"
    And I wait for 2 seconds
    And I fill in the email with "memberc@mail.com"
    And I wait for 2 seconds
    And I click the save button
    And I wait for 2 seconds
    And I navigate to members
    And I wait for 2 seconds
    And I click on filter member
    And I wait for 2 seconds
    And I filter members by name with query "Member C"
    And I wait for 2 seconds
    Then I should see the member with name "Member C" in the list of members
