Feature: Display the homepage
  In order to know on which site I am
  As a visitor
  I want to see blog title

  Scenario: Display the of the blog on the homepage
    When I visit the homepage
    Then I see title
