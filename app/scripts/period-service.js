'use strict'

angular.module('fuelCalculator').service('periodService', [
  function () {
    var TABLE_DAY = 'يوم'
    var TABLE_WEEK = 'اسبوع'
    var TABLE_MONTH = 'شهر'
    var TABLE_YEAR = 'سنة'
    var PERIOD_TABLE = [
      [TABLE_DAY, 1],
      [TABLE_WEEK, 7],
      [TABLE_MONTH, 30],
      [TABLE_YEAR, 360]
    ]

    var FACTOR_DAY = 'اليوم'
    var FACTOR_WEEK = 'الاسبوع'
    var FACTOR_MONTH = 'الشهر'
    var FACTOR_YEAR = 'السنة'
    var PERIODS_FACTORS = { day: 1, week: 7, month: 30, year: 360 }
    var VISUAL_PERIODS = {
      day: FACTOR_DAY,
      week: FACTOR_WEEK,
      month: FACTOR_MONTH,
      year: FACTOR_YEAR
    }

    this.getPeriodLabel = function (period) {
      return VISUAL_PERIODS[period]
    }

    this.getWaterPeriodLabel = function (period) {
      switch (period) {
        case 'month':
          return 'شهر'
        case 'three-months':
          return '3 شهور'
        case 'year':
          return 'سنة'
      }
    }

    this.getWaterValuePerMonth = function (period, valuePerPeriod) {
      switch (period) {
        case 'month':
          return valuePerPeriod
        case 'three-months':
          return valuePerPeriod / 3
        case 'year':
          return valuePerPeriod / 12
      }
    }

    this.getValuePerDay = function (period, valuePerPeriod) {
      return valuePerPeriod / PERIODS_FACTORS[period]
    }

    this.getPeriodTable = function () {
      return PERIOD_TABLE
    }

    this.getWaterTable = function () {
      var MONTH = 'شهر'
      var THREE_MONTHS = '3 شهور'
      var YEAR = 'سنة'

      return [[MONTH, 1], [THREE_MONTHS, 3], [YEAR, 12]]
    }
  }
])
