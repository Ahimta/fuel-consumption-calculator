'use strict'

angular.module('fuelCalculator').filter('fcPrice', ['$filter', 'fuelService', function ($filter, fuelService)
{
  var numberFilter = $filter('number')

  return function (price, fractionSize)
  {
    if (price < 1) { return numberFilter(price, fractionSize)              }
    else           { return numberFilter(fuelService.roundPrice(price), 0) }
  }
}])
