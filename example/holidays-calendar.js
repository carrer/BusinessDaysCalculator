var HolidaysCalendar=function(){var e={},n={},a=!1;return verifyDefault=function(){if(!a)for(var n in e)return void(a=n)},n.AddCalendar=function(n,a){e[n]=a},n.Locale=function(n){if("undefined"==typeof n)return a;if("undefined"==typeof e[n])throw"There is no calendar available for '"+n+"'";a=n},n.Year=function(n){if(verifyDefault(),!a)return!1;if("undefined"!=typeof e[a][n]){var r=[],t=e[a][n].months;for(var o in t)r.push(1*o);return{months:r,total:e[a][n].total}}return!1},n.Month=function(n,r){if(verifyDefault(),!a)return!1;if("undefined"!=typeof e[a][n]&&"undefined"!=typeof e[a][n].months[r]){var t=[],o=e[a][n].months[r].days;for(var d in o)t.push(1*d);return{days:t,total:e[a][n].months[r].total}}return!1},n.Day=function(n,r,t){return verifyDefault(),!!a&&("undefined"!=typeof e[a][n]&&"undefined"!=typeof e[a][n].months[r]&&"undefined"!=typeof e[a][n].months[r].days[t]&&e[a][n].months[r].days[t])},n}();"undefined"!=typeof module&&(module.exports={AddCalendar:HolidaysCalendar.AddCalendar,Year:HolidaysCalendar.Year,Month:HolidaysCalendar.Month,Day:HolidaysCalendar.Day,Locale:HolidaysCalendar.Locale});