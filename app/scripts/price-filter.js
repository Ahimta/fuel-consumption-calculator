'use strict'

angular.module('fuelCalculator').filter('fcPrice', ['$filter', function ($filter)
{
  var numberFilter = $filter('number')

  return function (number, fractionSize)
  {
    if (number < 1) { return numberFilter(number, fractionSize) }
    else            { return Math.round(number)                 }
  }
}])
