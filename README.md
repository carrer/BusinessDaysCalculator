# BusinessDaysCalculator
This is a library for calculating the number of business days between two dates, considering the number of holidays in the range.

You can use it as a Node.js module or in browser.

## Instalation

If you use NPM, then you can install it with ```npm install business-days-calculator```. Otherwise, you can download the latest release and use it in your browser or in other Javascript-based projects.

## Usage

### Node.js
```javascript
var calculator = require("business-days-calculator");
var calendar = require("holidays-calendar-brazil");
calculator.SetCalendar(calendar);

var today = new Date();
console.log('Today '+ (calculator.IsBusinessDay(today) ? 'is' : 'isn\'t') +' a business day');
console.log('Today '+ (calculator.IsHoliday(today) ? 'is' : 'isn\'t') +' a holiday');
console.log('The Carnival next year is due to '+ (calculator.NextHoliday(new Date("1 January "+today.getFullYear()))));

```

### Browser
```html
<script src="../node_modules/holidays-calendar/dist/HolidaysCalendar.js"></script>
<script src="../node_modules/holidays-calendar-brazil/src/HolidaysCalendar-brazil.js" charset="utf-8"></script>
<script src="../dist/BusinessDaysCalculator.js"></script>
<script>
var today = new Date();
console.log('Today '+ (BusinessDaysCalculator.IsBusinessDay(today) ? 'is' : 'isn\'t') +' a business day');
console.log('Today '+ (BusinessDaysCalculator.IsHoliday(today) ? 'is' : 'isn\'t') +' a holiday');
console.log('The Carnival next year is due to '+ (BusinessDaysCalculator.NextHoliday(new Date("1 January "+today.getFullYear()))));
</script>
```

## API Reference

### ContinuousDaysBetween(date1, date2)

Counts the number of continuous/consecutive days between *date1* and *date2*

**date1**: date, required. Starting date.

**date2**: date, required. Ending date.

***return***: integer. Number of continous days between dates.

#### Example

```bash
var calculator = require('business-days-calculator');
 
var data = calculator.ContinuousDaysBetween(new Date("1 January 2020"), new Date("31 January 2020"));
\\data equals to 30
```

### HolidaysBetween(date1, date2)

Counts the number of holidays between *date1* and *date2*

**date1**: date, required. Starting date.

**date2**: date, required. Ending date.

***return***: integer. Number of holidays according to the calendar in use.

#### Example

```bash
var calendar = require('holidays-calendar-brazil');
var calculator = require('business-days-calculator');
calculator.SetCalendar(calendar);
 
var data = calculator.HolidaysBetween(new Date("1 January 2020"), new Date("31 December 2020"));
\\data equals to 12
```

### IsBusinessDay(date)

Verifies if *date* doesn't correspond to a Sunday or Saturday, neither is a holiday.

**date**: date, required. Date reference.

***return***: Boolean. Whether *date* is a business day or not.

#### Example

```bash
var calendar = require('holidays-calendar-brazil');
var calculator = require('business-days-calculator');
calculator.SetCalendar(calendar);
 
var data = calculator.IsBusinessDay(new Date("1 January 2020"));
\\data equals to false
```

### IsHoliday(date)

Verifies if *date* happens to be a holiday.

**date**: date, required. Date reference.

***return***: Boolean. Whether *date* is a holiday or not.

#### Example
```bash
var calendar = require('holidays-calendar-brazil');
var calculator = require('business-days-calculator');
calculator.SetCalendar(calendar);
 
var data = calculator.IsHoliday(new Date("1 January 2020"));
\\data equals to true
```

### Locale()

Verifies which locale/calendar the library is set to use.

***return***: String. Locale identificator.

#### Example
```bash
var calendar = require('holidays-calendar-brazil');
var calculator = require('business-days-calculator');
calculator.SetCalendar(calendar);
 
var data = calculator.Locale();
\\data equals to 'brazil'
```

### NextHoliday(date)

Retrieves the next holiday after *date*.

**date**: date, required. Date reference (*date* won't be considered as a candidate).

***return***: Mixed. *date* if there's a holiday in the calendar anywhere after *date*; *false*, otherwise.

#### Example
```bash
var calendar = require('holidays-calendar-brazil');
var calculator = require('business-days-calculator');
calculator.SetCalendar(calendar);
 
var data = calculator.NextHoliday(new Date("1 January 2020"));
\\data equals to 'Mon Feb 24 2020' (which is Carnival)
```

### SetCalendar(calendar)

Configures the library to use *calendar* as a reference for holidays.

**calendar**: Mixed, required. *object*, as an extension of 'holidays-calendar' library (useful in Node.js environment only); *String* representing the locale to be used.

#### Example
```bash
var brazilianCalendar = require('holidays-calendar-brazil');
var calendar = require('holidays-calendar');
var calculator = require('business-days-calculator');

calculator.SetCalendar(brazilianCalendar);

var data = calculator.Locale();
\\data equals to 'brazil'

calendar.AddCalendar('generic',{}); // adds a new calendar, although empty

calculator.SetCalendar(calendar);
data = calculator.Locale();
\\data equals to 'generic'

calendar.AddCalendar('generic2',{}); // adds a new calendar, although empty
calculator.SetCalendar('generic2');
data = calculator.Locale();
\\data equals to 'generic2'

```

### WorkingDaysBetween(date1, date2, discountHolidays)

Counts the number of business days between *date1* and *date2*

**date1**: date, required. Starting date.

**date2**: date, required. Ending date.

**discountHolidays**: boolean, optional. Whether the library should consider holidays in the counting.

***return***: integer. Number of business days according to the calendar in use.

#### Example

```bash
var calendar = require('holidays-calendar-brazil');
var calculator = require('business-days-calculator');
calculator.SetCalendar(calendar);
 
var data = calculator.WorkingDaysBetween(new Date("1 January 2020"), new Date("31 December 2020"));
\\data equals to 250
data = calculator.WorkingDaysBetween(new Date("1 January 2020"), new Date("31 December 2020"), false);
\\data equals to 262
 
```