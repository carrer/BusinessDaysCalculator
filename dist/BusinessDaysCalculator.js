var BusinessDaysCalculator=function(){var e,t={};if("undefined"!=typeof module)e=require("holidays-calendar");else{if("undefined"==typeof HolidaysCalendar)throw'You need to import "HolidaysCalendar" library.';e=HolidaysCalendar}return RemainingHolidaysInYear=function(t){if(!(t instanceof Date))throw"'date' must be a Date object";var a,n,o=t.getFullYear(),i=t.getMonth(),r=t.getTime(),s=0,u=e.Month(o,i+1);if(!e.Year(o))return 0;if(u)for(var l in u.days)n=u.days[l],a=new Date(o,i,n),a.getTime()>=r&&s++;for(var f=i+2;f<=12;f++)u=e.Month(o,f),u&&(s+=u.total);return s},HolidaysInYearUntill=function(t){if("undefined"==typeof t)t=reference;else if(!(t instanceof Date))throw"'date' must be a Date object";var a,n,o,i=t.getFullYear(),r=t.getMonth(),s=t.getTime(),u=0;if(!e.Year(i))return 0;for(var l=0;l<r;l++)o=e.Month(i,l+1),o&&(u+=o.total);if(o=e.Month(i,r+1))for(var f in o.days)n=o.days[f],a=new Date(i,r,n),a.getTime()<=s&&u++;return u},t.NextHoliday=function(t){if(!(t instanceof Date))throw"'date' must be a Date object";for(var a,n,o=t.getFullYear(),i=t.getMonth(),r=t.getTime();o<=2100;){if(tmp=e.Month(o,i+1),tmp){for(var s in tmp.days)if(n=tmp.days[s],a=new Date(o,i,n),a.getTime()>r)return a;i++}else i++;i>11&&(i=0,o++)}return!1},t.HolidaysBetween=function(t,a){var n,o,i=0;if(!(t instanceof Date))throw"'date1' must be a Date object";if(!(a instanceof Date))throw"'date2' must be a Date object";if(t.getTime()>a.getTime()&&(n=t,t=a,a=n),t.getFullYear()==a.getFullYear()){var r,s=t.getFullYear(),u=t.getTime(),l=a.getTime();if(u==l)return 0;for(var f=t.getMonth();f<=a.getMonth();f++)if(o=e.Month(s,f+1))for(var d in o.days)r=o.days[d],n=new Date(s,f,r),n.getTime()>=u&&n.getTime()<=l&&i++}else{var s=t.getFullYear();for(i+=RemainingHolidaysInYear(t);++s<a.getFullYear();)o=e.Year(s),o&&(i+=o.total);i+=HolidaysInYearUntill(a)}return i},t.IsHoliday=function(t){if(!(t instanceof Date))throw"'date' must be a Date object";return 0!=e.Day(t.getFullYear(),t.getMonth()+1,t.getDate())},t.IsBusinessDay=function(t){if(!(t instanceof Date))throw"'date' must be a Date object";return 0!=t.getDay()&&6!=t.getDay()&&0==e.Day(t.getFullYear(),t.getMonth()+1,t.getDate())},t.WorkingDaysBetween=function(e,a,n){var o,i,r,s,u=0;if(!(e instanceof Date))throw"'date1' must be a Date object";if(!(a instanceof Date))throw"'date2' must be a Date object";if("undefined"==typeof n&&(n=!0),e>a){var l=e;e=a,a=l}o=Math.ceil((a.getTime()-e.getTime())/864e5)+1,i=Math.floor(o/7),u+=5*i,r=o-7*i,s=new Date(+e);for(var f=0;f<r;f++)0!=s.getDay()&&6!=s.getDay()&&u++,s.setDate(s.getDate()+1);return n?u-t.HolidaysBetween(e,a):u},t.ContinuousDaysBetween=function(e,t){if(!(e instanceof Date))throw"'date1' must be a Date object";if(!(t instanceof Date))throw"'date2' must be a Date object";if(e>t){var a=e;e=t,t=a}return Math.ceil((t.getTime()-e.getTime())/864e5)},t.Locale=function(){return e.Locale()},t.SetCalendar=function(t){"undefined"!=typeof module&&"undefined"!=typeof t&&"function"==typeof t.Year&&"function"==typeof t.Month&&"function"==typeof t.Day&&(e=t),"string"==typeof t&&e.Locale(t)},t}();!function(){"use strict";"undefined"!=typeof module&&(module.exports={NextHoliday:BusinessDaysCalculator.NextHoliday,ContinuousDaysBetween:BusinessDaysCalculator.ContinuousDaysBetween,WorkingDaysBetween:BusinessDaysCalculator.WorkingDaysBetween,IsBusinessDay:BusinessDaysCalculator.IsBusinessDay,IsHoliday:BusinessDaysCalculator.IsHoliday,HolidaysBetween:BusinessDaysCalculator.HolidaysBetween,Locale:BusinessDaysCalculator.Locale,SetCalendar:BusinessDaysCalculator.SetCalendar})}();