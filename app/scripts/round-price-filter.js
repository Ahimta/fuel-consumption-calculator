'use strict'

angular.module('fuelCalculator').filter('roundPrice', ['$filter', 'fuelService', function ($filter, fuelService)
{
  var numberFilter = $filter('number')

  return function (price, fractionSize)
  {
    if (price < 10) { return numberFilter(price, fractionSize) }
    else            { return fuelService.roundPrice(price)     }
  }
}])
