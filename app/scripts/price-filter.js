'use strict'

angular.module('fuelCalculator').filter('fcPrice', ['fuelService', function (fuelService)
{
  return fuelService.roundPrice
}])
