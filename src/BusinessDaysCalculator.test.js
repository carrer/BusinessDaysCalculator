var calculator = require("../dist/BusinessDaysCalculator.js");
var calendar = require("holidays-calendar");
var expect = require("chai").expect;

describe('Working days calculation ...', function()
{
    it('should be 23 for January 2020 ignoring holidays', function()
    {
        var days = calculator.WorkingDaysBetween(new Date("1 January 2020"), new Date("31 January 2020"), false); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(23);
    });

    it('should be 22 for April 2020 ignoring holidays', function()
    {
        var days = calculator.WorkingDaysBetween(new Date("1 April 2020"), new Date("30 April 2020"), false); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(22);
    });

    it('should be 262 for year 2020 ignoring holidays', function()
    {
        var days = calculator.WorkingDaysBetween(new Date("1 January 2020"), new Date("31 December 2020"), false); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(262);
    });

    it('should be 920 between 2017-01-01 and 2020-07-10 ignoring holidays', function()
    {
        var days = calculator.WorkingDaysBetween(new Date("1 January 2017"), new Date("10 July 2020"), false); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(920);
    });

    it('should be 1 for equal dates', function()
    {
        var days = calculator.WorkingDaysBetween(new Date("01 January 2020"), new Date("01 January 2020")); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(1);
    });    

    it('should be 3 for a week with two holidays', function()
    {
        calendar.AddCalendar('generic', {
            "2020": {"months": {"1": {"days": {"6":"Holiday", "7":"Holiday"}, "total": 1}}, "total": 1},
        });
        calendar.Locale('generic');

        var days = calculator.WorkingDaysBetween(new Date("5 January 2020"), new Date("11 January 2020")); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(3);
    });    

    it('should work equaly for parameters in reverse order', function()
    {
        var a = new Date("5 January 2020"),
            b = new Date("11 January 2020"),
            d1 = calculator.WorkingDaysBetween(a, b),
            d2 = calculator.WorkingDaysBetween(b, a);

        expect(d1).to.be.a('number');
        expect(d1).to.be.equal(d2);
    });

    it('should include both dates in the calc', function()
    {
        var days = calculator.WorkingDaysBetween(new Date("2 January 2017"), new Date("6 January 2017"), false); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(5);
    });    


});

describe('Holidays calculation ...', function()
{
    it('should be 3 if our calendar only 3 holidays', function()
    {
        calendar.AddCalendar('generic', {
            "2020": {"months": {"1": {"days": {"6":"Holiday"}, "total": 1}}, "total": 1},
            "2021": {"months": {"1": {"days": {"5":"Holiday"}, "total": 1}}, "total": 1},
            "2050": {"months": {"12": {"days": {"2":"Holiday"}, "total": 1}}, "total": 1}
        });
        calendar.Locale('generic');
        var days = calculator.HolidaysBetween(new Date("31 January 2019"), new Date("31 December 2050")); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(3);

    });

    it('should include the first date, if it\'s a holiday', function()
    {
        calendar.AddCalendar('generic', {
            "2020": {"months": {"1": {"days": {"6":"Holiday"}, "total": 1}}, "total": 1},
            "2021": {"months": {"1": {"days": {"5":"Holiday"}, "total": 1}}, "total": 1},
            "2050": {"months": {"12": {"days": {"2":"Holiday"}, "total": 1}}, "total": 1}
        });
        calendar.Locale('generic');
        var days = calculator.HolidaysBetween(new Date("6 January 2020"), new Date("31 December 2050")); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(3);

    });

    it('should include the last date, if it\'s a holiday', function()
    {
        calendar.AddCalendar('generic', {
            "2020": {"months": {"1": {"days": {"6":"Holiday"}, "total": 1}}, "total": 1},
            "2021": {"months": {"1": {"days": {"5":"Holiday"}, "total": 1}}, "total": 1},
            "2050": {"months": {"12": {"days": {"2":"Holiday"}, "total": 1}}, "total": 1}
        });
        calendar.Locale('generic');
        var days = calculator.HolidaysBetween(new Date("1 January 2017"), new Date("2 December 2050")); 
        expect(days).to.be.a('number');
        expect(days).to.be.equal(3);

    });

    it('should decide whether a date is holiday or not', function()
    {
        calendar.AddCalendar('generic', {
            "2020": {"months": {"1": {"days": {"6":"Holiday"}, "total": 1}}, "total": 1},
        });
        calendar.Locale('generic');

        expect(calculator.IsHoliday(new Date("6 January 2020"))).to.be.true;
        expect(calculator.IsHoliday(new Date("5 January 2020"))).to.be.false;

    });
})