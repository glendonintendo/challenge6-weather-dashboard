# Weather Dashboard <!-- omit in toc -->
- [Description](#description)
- [Demo](#demo)
- [Submission Requirements](#submission-requirements)
  - [User Story](#user-story)
  - [Acceptance Criteria](#acceptance-criteria)
  - [Grading Criteria](#grading-criteria)
## Description
## Demo
## Submission Requirements
### User Story
```
AS A traveler
I WANT to see the weather outlook for multiple cities
SO THAT I can plan a trip accordingly
```
### Acceptance Criteria
```
GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
```
### Grading Criteria
#### Technical Acceptance Criteria: 40% <!-- omit in toc -->
- [ ] User can search for a city and is presented with current and future conditions for that city
- [ ] Searched cities are saved in search history
- [ ] Displayed content for a searched city include city name, date, icon represenation of weather conditions, temperature, humidity, wind speed, and UV index
- [ ] UV index additionally are inidacted with different colors indicating favorable, moderate and severe
- [ ] Future weather conditions show 5-day forecast that displays date, icon represenation of weather conditions, temperatures and humidity
- [ ] Cities saved in search history can be clicked again to show weather forecast
- [ ] Application uses OpenWeather API to retrieve weather data
- [ ] Application uses localStorage to store persistent data
#### Deployment: 32% <!-- omit in toc -->
- [ ] Application deployed at live URL
- [ ] Application loads with no errors
- [ ] Application GitHub URL submitted
- [ ] GitHub repository contains application code
#### Application Quality: 15% <!-- omit in toc -->
- [ ] Application user experience is intuitive and easy to navigate
- [ ] Application user interface style is clean and polished
- [ ] Application resembles the mock-up functionality
#### Repository Quality: 13% <!-- omit in toc -->
- [ ] Repository has a unique name
- [ ] Repository follows best practices for file structure and naming conventions
- [ ] Repository follows best practices for calls/id naming conventions, indentation, quality comments, etc.
- [ ] Repository contains multiple descriptive commit messages
- [ ] Repository contains quality README file with description, screenshot, and link to deployed application