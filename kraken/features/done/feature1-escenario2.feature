Feature: Create Post

  @user1 @web
  Scenario: Create a post and leave it in draft
    Given I login into ghost admin console
    When I navigate to posts
    And I wait for 2 seconds
    And I click the create posts button
    And I wait for 2 seconds
    And I fill in the title with "Post Feature 1 Scenario 2"
    And I wait for 2 seconds
    And I fill in the content with "Content for Post Feature 1 Scenario 2"
    And I wait for 2 seconds
    And I navigate to posts
    And I wait for 2 seconds
    Then I should see the post with title "Post Feature 1 Scenario 2" in the list of posts
    And I should see the post with title "Post Feature 1 Scenario 2" in the list of posts with status "Draft"
    And I clean up the posts
