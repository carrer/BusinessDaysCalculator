var BusinessDaysCalculator = (function(){

    var methods = {},
        holidays;
    if (typeof module !== 'undefined')
        holidays = require('holidays-calendar');
    else
    {
        if (typeof HolidaysCalendar == 'undefined')
            throw 'You need to import "HolidaysCalendar" library.';
        holidays = HolidaysCalendar;
    }
    
    RemainingHolidaysInYear = function(date)
    {
        if ( !(date instanceof Date) )
            throw "'date' must be a Date object";

        var year = date.getFullYear(),
            month = date.getMonth(),
            timestamp = date.getTime(),
            numHolidays = 0,
            tempDate,
            day,
            months = holidays.Month(year, month+1);

        if (!holidays.Year(year))
            return 0;

        if ( months )
        for(var key in months.days )
        {
            day = months.days[key];
            tempDate = new Date(year, month, day);
            if (tempDate.getTime() >= timestamp)
                numHolidays++;
        }

        for(var i=month+2;i<=12;i++)
        {
            months = holidays.Month(year, i);
            if (months)
                numHolidays += months.total;
        }

        return numHolidays;
    }

    HolidaysInYearUntill = function(date)
    {

        if ( typeof date == 'undefined' )
            date = reference;
        else if ( !(date instanceof Date))
            throw "'date' must be a Date object";

        var year = date.getFullYear(),
            month = date.getMonth(),
            timestamp = date.getTime(),
            numHolidays = 0,
            tempDate,
            day,
            temp;

        if (!holidays.Year(year))
            return 0;

        for(var i=0;i<month;i++)
        {
            temp = holidays.Month(year, i+1);
            if (temp)
                numHolidays += temp.total;
        }

        temp = holidays.Month(year, month+1);
        if (temp)
        for(var key in temp.days )
        {
            day = temp.days[key];
            tempDate = new Date(year, month, day);
            if (tempDate.getTime() <= timestamp)
                numHolidays++;
        }


        return numHolidays;
    }

    methods.NextHoliday = function(date)
    {
        if ( !(date instanceof Date))
            throw "'date' must be a Date object";

        var year = date.getFullYear(),
            month = date.getMonth(),
            timestamp = date.getTime(),
            tempDate,
            day,
            temp;

        while(year <= 2100)
        {
            tmp = holidays.Month(year, month+1);
            if ( tmp )
            {
                for(var key in tmp.days)
                {
                    day = tmp.days[key];
                    tempDate = new Date(year, month, day);
                    if (tempDate.getTime() > timestamp) 
                        return tempDate;
                }
                month++;
            }
            else
                month++;

            if (month > 11)
            {
                month=0;
                year++;
            }
        }
        return false;
    }

    methods.HolidaysBetween = function(date1, date2)
    {
        var numHolidays = 0,
            tempDate,
            aux;

        if (!(date1 instanceof Date))
            throw "'date1' must be a Date object";
        if (!(date2 instanceof Date))
            throw "'date2' must be a Date object";

        if (date1.getTime() > date2.getTime())
        {
            tempDate = date1;
            date1 = date2;
            date2 = tempDate;
        }
        
        if (date1.getFullYear() == date2.getFullYear())
        {
            var day,
                year = date1.getFullYear(),
                t1 = date1.getTime(),
                t2 = date2.getTime();

            if (t1 == t2) // dates are equal
                return 0;

            for(var i=date1.getMonth();i<=date2.getMonth();i++)
            {
                aux = holidays.Month(year, i+1);
                if (aux)
                    for(var key in aux.days)
                    {
                        day = aux.days[key];
                        tempDate = new Date(year, i, day);
                        if (tempDate.getTime() >= t1 && tempDate.getTime() <= t2) 
                            numHolidays++;
                    }
            }
        }
        else
        {
            var year = date1.getFullYear();
            numHolidays += RemainingHolidaysInYear(date1);

            while(++year < date2.getFullYear())
            {
                aux = holidays.Year(year);
                if (aux)
                    numHolidays += aux.total;
            }

            numHolidays += HolidaysInYearUntill(date2);
        }

        return numHolidays;
    }

    methods.IsHoliday = function(date)
    {
        if (!(date instanceof Date))
            throw "'date' must be a Date object";
        
        return holidays.Day(date.getFullYear(), date.getMonth()+1, date.getDate()) != false;
    }    

    methods.IsBusinessDay = function(date)
    {
        if (!(date instanceof Date))
            throw "'date' must be a Date object";
        
        return date.getDay() != 0 && date.getDay() != 6 && holidays.Day(date.getFullYear(), date.getMonth()+1, date.getDate()) == false;
    }

    methods.WorkingDaysBetween = function(date1, date2, discountHolidays)
    {
        var days_diff,
            weeks_diff,
            remaining,
            working_days = 0,
            next_holiday,
            clone;

        if (!(date1 instanceof Date))
            throw "'date1' must be a Date object";
        if (!(date2 instanceof Date))
            throw "'date2' must be a Date object";

        if (typeof discountHolidays == 'undefined')
            discountHolidays = true;

        if (date1 > date2 )
        {
            var tempDate = date1;
            date1 = date2;
            date2 = tempDate;
        }

        days_diff = Math.ceil(( date2.getTime() - date1.getTime() ) / 86400000) + 1; // days between the two dates
        weeks_diff = Math.floor(days_diff / 7); // and weeks

        working_days += weeks_diff * 5; // every week, 5 working days

        remaining = days_diff - ( weeks_diff * 7 ); // let's count the remaining days

        clone = new Date(+date1);

        for(var i=0;i<remaining;i++)
        {
            if (clone.getDay() != 0 && clone.getDay() != 6)
                working_days++;

            clone.setDate(clone.getDate()+1);
        }

        return discountHolidays ? working_days - methods.HolidaysBetween(date1, date2) : working_days;
    }

    methods.ContinuousDaysBetween = function(date1, date2)
    {
        if (!(date1 instanceof Date))
            throw "'date1' must be a Date object";
        if (!(date2 instanceof Date))
            throw "'date2' must be a Date object";

        if (date1 > date2 )
        {
            var tempDate = date1;
            date1 = date2;
            date2 = tempDate;
        }

        return Math.ceil( ( date2.getTime() - date1.getTime() ) / 86400000); // days between the two dates
    }


    methods.Locale = function()
    {
        return holidays.Locale();
    }

    methods.SetCalendar = function(calendar)
    {
        if (typeof module !== 'undefined') {

            if (typeof calendar != 'undefined' && typeof calendar['Year'] =='function' && typeof calendar['Month'] =='function' && typeof calendar['Day'] =='function')
                holidays = calendar;
        }

        if (typeof calendar == 'string')
            holidays.Locale(calendar);
    }


    return methods;

}());

(function() {
    'use strict';

    if (typeof module !== 'undefined')
        module.exports = {
            NextHoliday: BusinessDaysCalculator.NextHoliday,
            ContinuousDaysBetween: BusinessDaysCalculator.ContinuousDaysBetween,
            WorkingDaysBetween: BusinessDaysCalculator.WorkingDaysBetween,
            IsBusinessDay: BusinessDaysCalculator.IsBusinessDay,
            IsHoliday: BusinessDaysCalculator.IsHoliday,
            HolidaysBetween: BusinessDaysCalculator.HolidaysBetween,
            Locale: BusinessDaysCalculator.Locale,
            SetCalendar: BusinessDaysCalculator.SetCalendar
        }

})();