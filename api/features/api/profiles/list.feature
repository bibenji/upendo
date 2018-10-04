Feature: Organisation
  In order to use the application
  I need to be able to list organisations trough the API.

  Background:

#    Given the database is empty
#    And data fixtures are loaded
    Given I am connected as normal user

  Scenario: List Organizations

#    Given I add "Accept" header equal to "application/ld+json"
#    Given I add "Content-Type" header equal to "application/ld+json"

#    When I send a "GET" request to "/organizations"
    When I send a "GET" request to "/users" with parameter for identification

    Then the response status code should be 200
    And the response should be in JSON
#    And the header "Content-Type" should be equal to "application/ld+json; charset=utf-8"
