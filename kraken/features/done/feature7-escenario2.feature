Feature: Create Post

  @user1 @web
  Scenario: Create a member and filter it
    Given I login into ghost admin console
    When I navigate to members
    And I wait for 3 seconds
    And I click the create New member button
    And I wait for 2 seconds
    And I fill in the Name with "New member Unsubscribed"
    And I wait for 2 seconds
    And I fill in the email with "newmemberunsubscribed@mail.com"
    And I wait for 2 seconds
    And I set member as unsubscribed
    And I wait for 2 seconds
    And I click the save button
    And I wait for 2 seconds
    And I navigate to members
    And I wait for 2 seconds
    And I filter members as "unsubscribed" member
    And I wait for 2 seconds
    Then I should see the member with email "newmemberunsubscribed@mail.com" in the list of members
