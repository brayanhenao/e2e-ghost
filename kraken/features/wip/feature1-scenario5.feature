Feature: Create Post

  @user1 @web
  Scenario: Create a post and preview it on mobile
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "Post Feature 1 Scenario 5"
    And I fill in the content with "Content for Post Feature 1 Scenario 5"
    And I wait for 2 seconds
    And I click the preview button
    And I wait for 2 seconds
    And I select the mobile view
    Then I should see the title "Post Feature 1 Scenario 5"
