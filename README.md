# BusinessDaysCalculator
Library for calculating the number of business days, considering a holiday calendar, between two dates.

- [Install](#install)
- [Usage](#usage)
- [Methods](#methods)
  - [calc `(<Date> start, <Date> end[, <String> timezone])`](#calc-date-start-date-end-string-timezone)
- [Tests](#tests)
- [Developing](#developing)
  - [Requirements](#requirements)
- [License](#license)

## Install

This library comes with the Brazilian Holidays Calendar as the collection of days that will not be considered for counting the number business days between a range of two dates.
The best way to customize this library to work with a different Holidays calendar is modifying the entries of the **holidays.csv** spreadsheet (within the **src** folder) and re-builing the library using ```npm build``` (this will create a minified version of this library with your custom calendar in it at the **dist** folder - just make sure you use the same column scheme and date format).

## Usage

You can either use this library as a NPM module or as a standard Javascript library.

### NodeJS
```
var calculator = require("BusinessDaysCalculator.js");
var days = calculator.HolidaysBetween(new Date("1 January 2020"), new Date("31 January 2020"));
console.log('2020 has '+days+' holidays');
```

### In-browser
```
<script src="BusinessDaysCalculator.js"></script>
<script>
alert('Today '+(BusinessDaysCalculator.IsHoliday(new Date())?'is':'is not')+' a holiday');
</script>
```