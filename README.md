# Whether The Feather Falls Or Flies

ACCEPTANCE CRITERIA
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

ISSUES
    Create general layout. should include:
    - header
    - search bar
    - search history
    - current city section
        > current day info
        > 5 day forecast info
    - save searched cities to local storage 
        > make searched cities clickable to display that cities weather information
        > add button(s) to clear search history and/or clear individual cities from search history?
    