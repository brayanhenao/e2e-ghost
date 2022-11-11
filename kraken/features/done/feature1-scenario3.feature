Feature: Create Post

  @user1 @web
  Scenario: Create a post and schedule the publish date
    Given I tear down the data
    And I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I take a screenshot
    And I wait for 2 seconds
    And I fill in the title with "Post Feature 1 Scenario 3"
    And I fill in the content with "Content for Post Feature 1 Scenario 3"
    And I take a screenshot
    And I click the publish button
    And I wait for 2 seconds
    And I schedule post for later with date "2024-01-01" and time "01:00"
    And I take a screenshot
    And I wait for 2 seconds
    And I click the continue publish button
    And I wait for 2 seconds
    And I click the publish now button
    And I navigate to posts
    And I wait for 2 seconds
    And I take a screenshot
    Then I should see the post with title "Post Feature 1 Scenario 3" in the list of posts
    And I should see the post with title "Post Feature 1 Scenario 3" in the list of posts with status "Scheduled"
    And I should see the post with title "Post Feature 1 Scenario 3" in the list of posts with scheduled date "2024-01-01" and time "01:00"
    And I clean up the posts
