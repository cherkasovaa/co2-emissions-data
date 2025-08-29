# CO2 Emissions Data

React application for visualizing CO2 emissions data by countries.

## Key Features
- Loading of a large JSON dataset (~100MB) with historical CO₂ emissions data;
- Display of countries with ISO code and population;
- Accordion with a table of yearly data and optional metrics;
- Search by country;
- Year filtering (selection via dropdown);
- Sorting by name or population;
- Dynamic column selection through Settings modal;
- Highlight of updated values.

## Performance Profiling Task
### Results Before Optimization
- Commit Duration: 131ms
- Render Duration: 233ms
- CountriesList: 100.9ms
- CountryTable: 69.8ms-101.5ms
- DataProvider: 30.7ms
- TopBar: 15.3ms
- Settings: 2.6ms
- Observations:
  - Heavy re-renders on all components during interactions;
  - CountriesList component taking significant render time;
  - Unnecessary re-renders of child components when parent state changes;
  - All country items re-rendering on search/filter operations.

![Sorted list of components by render duration before optimization](/public/Sorted%20list%20of%20components%20by%20render%20duration%20before%20optimization.png)
![Visual representation of component render times before optimization](/public/Visual%20representation%20of%20component%20render%20times%20before%20optimization.png)


### Results After Optimization
- Commit Duration: 69ms
- Render Duration: 191ms
- CountriesList: 21.6ms
- CountryTable: 19.2ms-21.8ms
- DataProvider: 19.1ms
- TopBar: 19.9ms
- Settings: 1.6ms
- Observations:
  - Sorting logic was memoized, avoiding unnecessary recalculations;
  - CountriesList now re-renders only filtered/changed items;
  - Child components avoid extra re-renders thanks to `React.memo`;

![Sorted list of components by render duration after optimization](/public/Sorted%20list%20of%20components%20by%20render%20duration%20after%20optimization.png)
![Visual representation of component render times after optimization](/public/Visual%20representation%20of%20component%20render%20times%20after%20optimization.png)