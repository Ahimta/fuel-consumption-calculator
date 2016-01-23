'use strict'

angular.module('fuelCalculator').service('periodService', ['$window', function ($window)
{
    var TABLE_DAY = 'يوم'
    var TABLE_WEEK = 'اسبوع'
    var TABLE_MONTH = 'شهر'
    var TABLE_YEAR = 'سنة'
    var PERIOD_TABLE = [[TABLE_DAY, 1], [TABLE_WEEK, 7], [TABLE_MONTH, 30], [TABLE_YEAR, 360]]

    var FACTOR_DAY = 'اليوم'
    var FACTOR_WEEK = 'الاسبوع'
    var FACTOR_MONTH = 'الشهر'
    var FACTOR_YEAR = 'السنة'
    var PERIODS_FACTORS = {day: 1, week: 7, month: 30, year: 360}
    var VISUAL_PERIODS = {day: FACTOR_DAY, week: FACTOR_WEEK, month: FACTOR_MONTH, year: FACTOR_YEAR}

    this.getVisualPeriod = function (period) { return VISUAL_PERIODS[period] }

    this.getValuePerDay = function (period, valuePerPeriod) { return valuePerPeriod / PERIODS_FACTORS[period] }

    this.getPeriodTable = function () { return PERIOD_TABLE }
}])
