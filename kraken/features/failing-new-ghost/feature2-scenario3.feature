Feature: List Posts

  @user1 @web
  Scenario: Filter posts in draft status
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I fill in the title with "Draft Post Feature 2 Scenario 3"
    And I fill in the content with "Content for Draft Post Feature 2 Scenario 3"
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I wait for 2 seconds
    And I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I fill in the title with "Published Post Feature 2 Scenario 3"
    And I fill in the content with "Content for Published Post Feature 2 Scenario 3"
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I click the publish button
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I fill in the title with "Scheduled Post Feature 2 Scenario 3"
    And I fill in the content with "Content for Scheduled Post Feature 2 Scenario 3"
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I click the publish button
    And I wait for 2 seconds
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I schedule post for later with date "2024-01-01" and time "01:00"
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I navigate to posts
    And I take a screenshot for Feature "F2" and Scenario "SC2"
    And I filter the posts by status "Draft"
    And I take a screenshot for Feature "F2" and Scenario "SC3"
    Then I should see the post with title "Draft Post Feature 2 Scenario 3" in the list of posts
    And I should not see the post with title "Published Post Feature 2 Scenario 3" in the list of posts
    And I should not see the post with title "Scheduled Post Feature 2 Scenario 3" in the list of posts
    And I should not see the post with title "Draft Post Feature 2 Scenario 3" in the blog
