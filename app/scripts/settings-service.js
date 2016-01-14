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
    if (value) { $window.localStorage.setItem('consumption', parseFloat(value) || 8) }
    else       { return parseFloat($window.localStorage.getItem('consumption')) || 8 }
  }

  this.alertsRead = function (value)
  {
    if (value) { $window.localStorage.setItem('alertsRead', !!value) }
    else       { return !!$window.localStorage.getItem('alertsRead') }
  }
}])
