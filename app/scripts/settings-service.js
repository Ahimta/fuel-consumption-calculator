'use strict'

angular.module('fuelCalculator').service('settingsService', ['$window', function ($window)
{
  this.fuelType = function (value)
  {
    if (value) { $window.localStorage.setItem('fuelType', value)         }
    else       { return $window.localStorage.getItem('fuelType') || '91' }
  }

  this.consumption = function (value)
  {
    if (value) { $window.localStorage.setItem('consumption', parseFloat(value) || 10) }
    else       { return parseFloat($window.localStorage.getItem('consumption')) || 10 }
  }
}])
