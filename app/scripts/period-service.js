'use strict'

angular.module('fuelCalculator').service('periodService', ['$window', function ($window)
{
    var DAY = 'اليوم'
    var WEEK = 'الاسبوع'
    var MONTH = 'الشهر'
    var YEAR = 'السنة'

    var PERIODS_FACTORS = {day: 1, week: 7, month: 30, year: 360}
    var VISUAL_PERIODS = {day: DAY, week: WEEK, month: MONTH, year: YEAR}

    this.getPeriodMenu = function (initialPeriod)
    {
      var selectedPeriod = initialPeriod || 'day'

      return {
        getVisualSelectedPeriod: function () { return VISUAL_PERIODS[selectedPeriod] },
        isPeriodSelected: function (period) { return period === selectedPeriod },
        selectPeriod: function (period)
        {
          var currentSelectedPeriod = selectedPeriod
          selectedPeriod = period
          if ($window.ga) { $window.ga('send', 'event', 'Period', 'change', (currentSelectedPeriod + '->' + period)) }
        },

        getValuePerDay: function (valuePerPeriod) { return valuePerPeriod / PERIODS_FACTORS[selectedPeriod] }
      }
    }
}])
