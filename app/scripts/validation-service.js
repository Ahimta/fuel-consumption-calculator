'use strict'

angular.module('fuelCalculator').service('validationService', [function ()
{
  function getValidValueFactory (validValues, defaultValue)
  {
    return function (value)
    {
      if (validValues.indexOf(value) >= 0) { return value        }
      else                                 { return defaultValue }
    }
  }

  this.getValidWaterMeasure = getValidValueFactory(['cost', 'volume'], 'cost')
  this.getValidWaterPeriod = getValidValueFactory(['month', 'three-months', 'year'], 'month')
  this.getValidCounterRadius = getValidValueFactory(['12', '19', '40', '50', '60'], '19')
  this.getValidPriceType = getValidValueFactory(['old', 'new'], 'old')
}])
