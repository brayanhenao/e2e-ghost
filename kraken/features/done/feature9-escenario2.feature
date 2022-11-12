Feature: Create Post

  @user1 @web
  Scenario: Inject code into ghost footer
    Given I login into ghost admin console
    When I navigate to settings
    And I wait for 2 seconds
    And I click the code injection setting
    And I wait for 2 seconds
    And I fill in the Ghost Footer with "<h1 class='custom-footer'>CUSTOM FOOTER</h1>"
    And I wait for 2 seconds
    And I click the save button
    And I wait for 2 seconds
    And I navigate to ghost blog
    And I wait for 2 seconds
    And I scroll down in ghost blog
    And I wait for 2 seconds
    Then I should see the ghost footer with text "CUSTOM FOOTER"